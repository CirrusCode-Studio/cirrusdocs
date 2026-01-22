import { DocumentSignals } from "@/core/parsing/contracts/classification/document-signals.contract";
import { StructuralStrategy } from "./structural-strategy.interface";
import * as pdfjsLib from 'pdfjs-dist';
import { TextItem } from "pdfjs-dist/types/src/display/api";

export class PDFStructuralStrategy implements StructuralStrategy {
    private readonly HEADING_FONT_SIZE_THRESHOLD = 14;
    private readonly MIN_TABLE_ROWS = 3;
    private readonly HIGH_DENSITY_THRESHOLD = 0.7;
    private readonly SCANNED_IMAGE_RATIO_THRESHOLD = 0.8;

    supports(mimeType: string, extension: string): boolean {
        return mimeType === 'application/pdf' || extension === '.pdf';
    }

    async extract(file: Buffer, meta: { pageCount: number }): Promise<DocumentSignals["structural"]> {
        try {
            // Load PDF document
            const loadingTask = pdfjsLib.getDocument({ data: file });
            const pdf = await loadingTask.promise;

            const pageCount = meta.pageCount || pdf.numPages;
            
            // Initialize metrics
            let totalTextLength = 0;
            let imageOnlyPages = 0;
            let scannedPages = 0;
            let headingCount = 0;
            let tableCount = 0;
            const fontSizes: number[] = [];
            let totalTextDensity = 0;
            let pagesWithStructure = 0;

            // Process each page
            for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale: 1.0 });
                const pageArea = viewport.width * viewport.height;

                // Extract text content
                const textContent = await page.getTextContent();
                const pageText = textContent.items
                    .filter((item): item is TextItem => 'str' in item)
                    .map(item => item.str)
                    .join(' ');

                totalTextLength += pageText.length;

                // Analyze text items for fonts and headings
                const textItems = textContent.items.filter((item): item is TextItem => 'str' in item);
                let textAreaCovered = 0;

                textItems.forEach(item => {
                    if (item.height) {
                        fontSizes.push(item.height);
                        
                        // Detect headings based on font size
                        if (item.height >= this.HEADING_FONT_SIZE_THRESHOLD && item.str.trim().length > 0) {
                            headingCount++;
                        }

                        // Estimate text area coverage
                        const itemWidth = item.width || 0;
                        textAreaCovered += item.height * itemWidth;
                    }
                });

                // Calculate text density for this page
                const pageDensity = pageArea > 0 ? textAreaCovered / pageArea : 0;
                totalTextDensity += pageDensity;

                // Detect image-only pages (minimal text)
                if (pageText.trim().length < 50) {
                    const operators = await page.getOperatorList();
                    const hasImages = operators.fnArray.some((fn: number) =>
                        fn === pdfjsLib.OPS.paintImageXObject ||
                        fn === pdfjsLib.OPS.paintXObject
                    );

                    if (hasImages) {
                        imageOnlyPages++;
                        
                        // Check if it's a scanned page (image with minimal OCR text)
                        if (pageText.trim().length < 20) {
                            scannedPages++;
                        }
                    }
                }

                // Detect tables (simplified heuristic)
                tableCount += this.detectTables(textContent);

                // Detect structured layout
                if (this.hasStructuredLayout(textItems, viewport)) {
                    pagesWithStructure++;
                }
            }

            // Calculate metrics
            const avgTextPerPage = pageCount > 0 ? totalTextLength / pageCount : 0;
            const imageOnlyPageRatio = pageCount > 0 ? imageOnlyPages / pageCount : 0;
            const scannedPageRatio = pageCount > 0 ? scannedPages / pageCount : 0;
            const fontVariance = this.calculateVariance(fontSizes);
            const avgTextDensity = pageCount > 0 ? totalTextDensity / pageCount : 0;
            const structuredLayoutRatio = pageCount > 0 ? pagesWithStructure / pageCount : 0;
            const likelyScanned = imageOnlyPageRatio > this.SCANNED_IMAGE_RATIO_THRESHOLD;
            const hasComplexFormatting = fontVariance > 3 || tableCount > 2;

            return {
                avgTextPerPage: Math.round(avgTextPerPage),
                imageOnlyPageRatio: parseFloat(imageOnlyPageRatio.toFixed(2)),
                headingCount,
                tableCount,
                fontVariance: parseFloat(fontVariance.toFixed(2)),
                avgTextDensity: parseFloat(avgTextDensity.toFixed(2)),
                scannedPageRatio: parseFloat(scannedPageRatio.toFixed(2)),
                structuredLayoutRatio: parseFloat(structuredLayoutRatio.toFixed(2)),
                hasComplexFormatting,
                likelyScanned,
            };
        } catch (error) {
            console.error('Error extracting PDF structural signals:', error);
            
            // Return default values on error
            return {
                avgTextPerPage: 0,
                imageOnlyPageRatio: 0,
                headingCount: 0,
                tableCount: 0,
                fontVariance: 0,
                avgTextDensity: 0,
                scannedPageRatio: 0,
                structuredLayoutRatio: 0,
                hasComplexFormatting: false,
                likelyScanned: false,
            };
        }
    }

    private detectTables(textContent: any): number {
        const items = textContent.items.filter((item: any): item is TextItem => 'str' in item);
        
        // Group items by Y coordinate (rows)
        const rowMap = new Map<number, TextItem[]>();
        
        items.forEach(item => {
            const y = Math.round(item.transform[5]);
            if (!rowMap.has(y)) {
                rowMap.set(y, []);
            }
            rowMap.get(y)!.push(item);
        });

        // Look for consistent column patterns (table indicator)
        let tableCount = 0;
        const rows = Array.from(rowMap.values());
        
        for (let i = 0; i < rows.length - this.MIN_TABLE_ROWS; i++) {
            const consecutiveRows = rows.slice(i, i + this.MIN_TABLE_ROWS);
            
            // Check if rows have similar column structure
            if (this.haveConsistentColumns(consecutiveRows)) {
                tableCount++;
                i += this.MIN_TABLE_ROWS; // Skip counted rows
            }
        }

        return tableCount;
    }

    private haveConsistentColumns(rows: TextItem[][]): boolean {
        if (rows.length < this.MIN_TABLE_ROWS) return false;

        // Get X positions from first row
        const firstRowX = rows[0]
            .map(item => Math.round(item.transform[4]))
            .sort((a, b) => a - b);

        if (firstRowX.length < 2) return false;

        // Check if other rows have similar X positions
        for (let i = 1; i < rows.length; i++) {
            const rowX = rows[i]
                .map(item => Math.round(item.transform[4]))
                .sort((a, b) => a - b);

            if (rowX.length < 2) return false;

            // Check for alignment (within 5 units tolerance)
            const aligned = rowX.some(x => 
                firstRowX.some(fx => Math.abs(x - fx) < 5)
            );

            if (!aligned) return false;
        }

        return true;
    }

    private hasStructuredLayout(items: TextItem[], viewport: any): boolean {
        if (items.length === 0) return false;

        // Check for consistent margins
        const leftMargins = items.map(item => item.transform[4]);
        const uniqueMargins = new Set(leftMargins.map(m => Math.round(m / 10) * 10));
        
        // Structured documents typically have 2-4 distinct margin levels
        const hasConsistentMargins = uniqueMargins.size >= 2 && uniqueMargins.size <= 4;

        // Check for vertical alignment
        const yPositions = items.map(item => Math.round(item.transform[5]));
        const uniqueYPositions = new Set(yPositions);
        const hasVerticalStructure = uniqueYPositions.size > 5;

        return hasConsistentMargins && hasVerticalStructure;
    }

    private calculateVariance(values: number[]): number {
        if (values.length === 0) return 0;

        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
        const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
        
        return Math.sqrt(variance); // Return standard deviation
    }
}