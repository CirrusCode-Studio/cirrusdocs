import { DocumentSignals } from "@/core/contracts/classification/document-signals.contract";
import { StructuralStrategy } from "./structural-strategy.interface";
import * as XLSX from 'xlsx';

export class ExcelStructuralStrategy implements StructuralStrategy {
    private readonly HEADER_INDICATORS = ['total', 'sum', 'average', 'count', 'name', 'date', 'id', 'description'];
    private readonly MIN_TABLE_ROWS = 3;
    private readonly MIN_TABLE_COLS = 2;

    supports(mimeType: string, extension: string): boolean {
        return extension === '.xlsx' || 
               extension === '.xls' ||
               mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
               mimeType === 'application/vnd.ms-excel';
    }

    async extract(file: Buffer): Promise<DocumentSignals["structural"]> {
        try {
            // Read the workbook
            const workbook = XLSX.read(file, { 
                type: 'buffer',
                cellStyles: true,
                cellFormula: true,
                cellNF: true
            });

            // Initialize metrics
            let totalCells = 0;
            let filledCells = 0;
            let totalSheets = workbook.SheetNames.length;
            let tableCount = 0;
            let headingCount = 0;
            const fontSizes: number[] = [];
            let hasFormulas = false;
            let hasCharts = false;
            let hasPivotTables = false;
            let hasMergedCells = false;
            let hasConditionalFormatting = false;

            // Process each sheet
            workbook.SheetNames.forEach(sheetName => {
                const sheet = workbook.Sheets[sheetName];
                
                // Analyze sheet structure
                const sheetMetrics = this.analyzeSheet(sheet);
                
                totalCells += sheetMetrics.totalCells;
                filledCells += sheetMetrics.filledCells;
                tableCount += sheetMetrics.tableCount;
                headingCount += sheetMetrics.headingCount;
                fontSizes.push(...sheetMetrics.fontSizes);
                
                if (sheetMetrics.hasFormulas) hasFormulas = true;
                if (sheetMetrics.hasMergedCells) hasMergedCells = true;
            });

            // Check for charts (stored in workbook)
            if (workbook.Workbook?.Sheets) {
                workbook.Workbook.Sheets.forEach((sheet: any) => {
                    if (sheet.Charts && sheet.Charts.length > 0) {
                        hasCharts = true;
                    }
                });
            }

            // Check for pivot tables and other complex features
            workbook.SheetNames.forEach(sheetName => {
                const sheet = workbook.Sheets[sheetName];
                
                // Check sheet metadata for pivot tables
                if ((sheet as any)['!pivotTables'] || 
                    (sheet as any)['!autofilter']) {
                    hasPivotTables = true;
                }
            });

            // Calculate metrics
            const avgTextDensity = totalCells > 0 ? filledCells / totalCells : 0;
            const fontVariance = this.calculateVariance(fontSizes);
            
            // Determine complex formatting
            const hasComplexFormatting = this.determineComplexFormatting(
                hasFormulas,
                hasCharts,
                hasPivotTables,
                hasMergedCells,
                totalSheets,
                fontVariance
            );

            // Excel-specific metrics
            return {
                avgTextPerPage: 0, // Not applicable for spreadsheets
                imageOnlyPageRatio: 0, // Not applicable for spreadsheets
                headingCount,
                tableCount: Math.max(1, tableCount), // At least 1 if there's data
                fontVariance: parseFloat(fontVariance.toFixed(2)),
                avgTextDensity: parseFloat(Math.min(1, avgTextDensity).toFixed(2)),
                scannedPageRatio: 0, // Excel files are always digital
                structuredLayoutRatio: 1, // Excel is inherently structured (grid-based)
                hasComplexFormatting,
                likelyScanned: false, // Excel files are always digital
            };
        } catch (error) {
            console.error('Error extracting Excel structural signals:', error);
            
            // Return default values on error
            return {
                avgTextPerPage: 0,
                imageOnlyPageRatio: 0,
                headingCount: 0,
                tableCount: 1,
                fontVariance: 1,
                avgTextDensity: 0.95,
                scannedPageRatio: 0,
                structuredLayoutRatio: 1,
                hasComplexFormatting: true,
                likelyScanned: false,
            };
        }
    }

    private analyzeSheet(sheet: XLSX.WorkSheet): {
        totalCells: number;
        filledCells: number;
        tableCount: number;
        headingCount: number;
        fontSizes: number[];
        hasFormulas: boolean;
        hasMergedCells: boolean | undefined;
    } {
        const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1');
        const totalCells = (range.e.r - range.s.r + 1) * (range.e.c - range.s.c + 1);
        
        let filledCells = 0;
        let headingCount = 0;
        const fontSizes: number[] = [];
        let hasFormulas = false;
        const hasMergedCells = sheet['!merges'] && sheet['!merges'].length > 0;

        // Track continuous data regions for table detection
        const dataRegions: Array<{startRow: number, endRow: number, cols: number}> = [];
        let currentRegion: {startRow: number, endRow: number, cols: Set<number>} | null = null;

        // Iterate through cells
        for (let row = range.s.r; row <= range.e.r; row++) {
            let hasDataInRow = false;
            const rowCols = new Set<number>();

            for (let col = range.s.c; col <= range.e.c; col++) {
                const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
                const cell = sheet[cellAddress];

                if (cell) {
                    filledCells++;
                    hasDataInRow = true;
                    rowCols.add(col);

                    // Check for formulas
                    if (cell.f) {
                        hasFormulas = true;
                    }

                    // Extract font size if available
                    if (cell.s && (cell.s as any).font && (cell.s as any).font.sz) {
                        fontSizes.push((cell.s as any).font.sz);
                    }

                    // Detect potential headers (first row or bold text)
                    if (row === range.s.r || this.looksLikeHeader(cell)) {
                        headingCount++;
                    }
                }
            }

            // Track data regions for table detection
            if (hasDataInRow) {
                if (currentRegion) {
                    currentRegion.endRow = row;
                    rowCols.forEach(col => currentRegion!.cols.add(col));
                } else {
                    currentRegion = {
                        startRow: row,
                        endRow: row,
                        cols: rowCols
                    };
                }
            } else if (currentRegion) {
                // Gap in data - save current region
                dataRegions.push({
                    startRow: currentRegion.startRow,
                    endRow: currentRegion.endRow,
                    cols: currentRegion.cols.size
                });
                currentRegion = null;
            }
        }

        // Save last region if exists
        if (currentRegion) {
            dataRegions.push({
                startRow: currentRegion.startRow,
                endRow: currentRegion.endRow,
                cols: currentRegion.cols.size
            });
        }

        // Count tables (continuous data regions with minimum size)
        const tableCount = dataRegions.filter(region => 
            (region.endRow - region.startRow + 1) >= this.MIN_TABLE_ROWS &&
            region.cols >= this.MIN_TABLE_COLS
        ).length;

        return {
            totalCells,
            filledCells,
            tableCount: Math.max(0, tableCount),
            headingCount,
            fontSizes,
            hasFormulas,
            hasMergedCells
        };
    }

    private looksLikeHeader(cell: XLSX.CellObject): boolean {
        // Check if cell has bold formatting
        if (cell.s && (cell.s as any).font && (cell.s as any).font.bold) {
            return true;
        }

        // Check if cell value contains common header keywords
        if (cell.v && typeof cell.v === 'string') {
            const value = cell.v.toLowerCase().trim();
            return this.HEADER_INDICATORS.some(indicator => 
                value.includes(indicator)
            );
        }

        return false;
    }

    private determineComplexFormatting(
        hasFormulas: boolean,
        hasCharts: boolean,
        hasPivotTables: boolean,
        hasMergedCells: boolean,
        sheetCount: number,
        fontVariance: number
    ): boolean {
        // Excel files are considered complex if they have:
        
        // 1. Formulas (calculations)
        if (hasFormulas) return true;

        // 2. Charts or visualizations
        if (hasCharts) return true;

        // 3. Pivot tables or advanced features
        if (hasPivotTables) return true;

        // 4. Multiple sheets with merged cells
        if (sheetCount > 1 && hasMergedCells) return true;

        // 5. High font variance (lots of formatting)
        if (fontVariance > 3) return true;

        // 6. Multiple sheets suggest complexity
        if (sheetCount > 3) return true;

        return false;
    }

    private calculateVariance(values: number[]): number {
        if (values.length === 0) return 0;
        if (values.length === 1) return 0;

        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
        const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
        
        return Math.sqrt(variance); // Return standard deviation
    }
}