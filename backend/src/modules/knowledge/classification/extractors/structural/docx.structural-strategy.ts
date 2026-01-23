import { DocumentSignals } from "@/core/contracts/classification/document-signals.contract";
import { StructuralStrategy } from './structural-strategy.interface';
import * as mammoth from 'mammoth';
import JSZip from 'jszip';
import { DOMParser } from '@xmldom/xmldom';

export class DocxStructuralStrategy implements StructuralStrategy {
    private readonly HEADING_STYLES = ['Heading1', 'Heading2', 'Heading3', 'Heading4', 'Heading5', 'Heading6', 'heading 1', 'heading 2', 'heading 3'];
    private readonly ESTIMATED_CHARS_PER_PAGE = 3000; // Rough estimate for page breaks

    supports(mimeType: string, extension: string): boolean {
        return extension === '.docx' || 
               mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }

    async extract(file: Buffer, meta: { pageCount: number }): Promise<DocumentSignals["structural"]> {
        try {
            const zip = await JSZip.loadAsync(file);
            
            // Extract document.xml (main content)
            const documentXml = await zip.file('word/document.xml')?.async('string');
            if (!documentXml) {
                throw new Error('Invalid DOCX file: document.xml not found');
            }

            const parser = new DOMParser();
            const doc = parser.parseFromString(documentXml, 'text/xml');

            // Extract text using mammoth for better text extraction
            const result = await mammoth.extractRawText({ buffer: file });
            const fullText = result.value;
            const totalTextLength = fullText.length;

            // Calculate page count if not provided
            const estimatedPageCount = meta.pageCount || Math.max(1, Math.ceil(totalTextLength / this.ESTIMATED_CHARS_PER_PAGE));

            // Extract structural elements
            const paragraphs = doc.getElementsByTagName('w:p');
            const tables = doc.getElementsByTagName('w:tbl');
            const images = this.countImages(doc);
            
            // Analyze paragraphs for headings and styles
            const { headingCount, fontSizes, styleVariance } = this.analyzeParagraphs(paragraphs);

            // Calculate font variance
            const fontVariance = this.calculateVariance(fontSizes);

            // Analyze images and image-only pages
            const imageOnlyPageRatio = this.estimateImageOnlyPages(paragraphs.length, images, estimatedPageCount);

            // Calculate text density (DOCX is digital, so typically high)
            const avgTextDensity = this.calculateTextDensity(paragraphs, fullText.length);

            // Calculate structured layout ratio
            const structuredLayoutRatio = this.calculateStructuredLayout(paragraphs, headingCount, tables.length);

            // Determine complex formatting
            const hasComplexFormatting = this.hasComplexFormatting(doc, tables.length, fontVariance, styleVariance);

            // Average text per page
            const avgTextPerPage = Math.round(totalTextLength / estimatedPageCount);

            return {
                avgTextPerPage,
                imageOnlyPageRatio: parseFloat(imageOnlyPageRatio.toFixed(2)),
                headingCount,
                tableCount: tables.length,
                fontVariance: parseFloat(fontVariance.toFixed(2)),
                avgTextDensity: parseFloat(avgTextDensity.toFixed(2)),
                scannedPageRatio: 0, // DOCX files are digital, never scanned
                structuredLayoutRatio: parseFloat(structuredLayoutRatio.toFixed(2)),
                hasComplexFormatting,
                likelyScanned: false, // DOCX is always digital
            };
        } catch (error) {
            console.error('Error extracting DOCX structural signals:', error);
            
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

    private analyzeParagraphs(paragraphs: HTMLCollectionOf<Element>) {
        let headingCount = 0;
        const fontSizes: number[] = [];
        const styles = new Set<string>();

        for (let i = 0; i < paragraphs.length; i++) {
            const p = paragraphs[i];
            
            // Check for heading styles
            const styleElement = p.getElementsByTagName('w:pStyle')[0];
            if (styleElement) {
                const styleVal = styleElement.getAttribute('w:val');
                if (styleVal) {
                    styles.add(styleVal);
                    
                    // Check if it's a heading style
                    if (this.isHeadingStyle(styleVal)) {
                        headingCount++;
                    }
                }
            }

            // Extract font sizes
            const fontSizeElements = p.getElementsByTagName('w:sz');
            for (let j = 0; j < fontSizeElements.length; j++) {
                const sizeVal = fontSizeElements[j].getAttribute('w:val');
                if (sizeVal) {
                    // w:sz is in half-points, convert to points
                    fontSizes.push(parseInt(sizeVal) / 2);
                }
            }

            // Also check for outline level (another way headings are defined)
            const outlineLvl = p.getElementsByTagName('w:outlineLvl')[0];
            if (outlineLvl && !styleElement) {
                headingCount++;
            }
        }

        return {
            headingCount,
            fontSizes,
            styleVariance: styles.size,
        };
    }

    private isHeadingStyle(styleName: string): boolean {
        const normalized = styleName.toLowerCase();
        return this.HEADING_STYLES.some(heading => 
            normalized.includes(heading.toLowerCase())
        ) || /heading\s*\d/.test(normalized) || /^h\d$/.test(normalized);
    }

    private countImages(doc: Document): number {
        // Count drawing elements (images, shapes)
        const drawings = doc.getElementsByTagName('w:drawing');
        const pictures = doc.getElementsByTagName('w:pict');
        
        return drawings.length + pictures.length;
    }

    private estimateImageOnlyPages(paragraphCount: number, imageCount: number, pageCount: number): number {
        if (pageCount === 0 || imageCount === 0) return 0;

        // Rough heuristic: if there are very few paragraphs per page and images exist
        const avgParasPerPage = paragraphCount / pageCount;
        
        // If less than 2 paragraphs per page on average and there are images
        if (avgParasPerPage < 2 && imageCount > 0) {
            // Estimate that some portion might be image-heavy
            return Math.min(0.5, imageCount / (pageCount * 2));
        }

        // For most DOCX files, image-only pages are rare
        return Math.min(0.1, imageCount / (pageCount * 5));
    }

    private calculateTextDensity(paragraphs: HTMLCollectionOf<Element>, totalTextLength: number): number {
        if (paragraphs.length === 0) return 0;

        // DOCX files are digital and typically have good text density
        // We'll base this on the ratio of non-empty paragraphs
        let nonEmptyParas = 0;
        
        for (let i = 0; i < paragraphs.length; i++) {
            const textElements = paragraphs[i].getElementsByTagName('w:t');
            let hasText = false;
            
            for (let j = 0; j < textElements.length; j++) {
                if (textElements[j].textContent && textElements[j].textContent!.trim().length > 0) {
                    hasText = true;
                    break;
                }
            }
            
            if (hasText) nonEmptyParas++;
        }

        // Dense documents have most paragraphs with content
        const densityRatio = nonEmptyParas / paragraphs.length;
        
        // Also factor in average text per paragraph
        const avgTextPerPara = totalTextLength / paragraphs.length;
        const lengthFactor = Math.min(1, avgTextPerPara / 100); // Normalize around 100 chars/para

        return Math.min(1, (densityRatio * 0.7) + (lengthFactor * 0.3));
    }

    private calculateStructuredLayout(paragraphs: HTMLCollectionOf<Element>, headingCount: number, tableCount: number): number {
        if (paragraphs.length === 0) return 0;

        // Factors indicating structure:
        // 1. Presence of headings
        const headingRatio = Math.min(1, headingCount / (paragraphs.length * 0.2)); // Expect ~20% max
        
        // 2. Presence of tables
        const tableScore = Math.min(0.3, tableCount * 0.1);
        
        // 3. Consistent styling
        let styledParas = 0;
        for (let i = 0; i < paragraphs.length; i++) {
            const hasStyle = paragraphs[i].getElementsByTagName('w:pStyle').length > 0;
            if (hasStyle) styledParas++;
        }
        const styleRatio = styledParas / paragraphs.length;

        // Combine factors
        return Math.min(1, (headingRatio * 0.4) + (tableScore) + (styleRatio * 0.3));
    }

    private hasComplexFormatting(doc: Document, tableCount: number, fontVariance: number, styleVariance: number): boolean {
        // Check for various complex formatting indicators
        
        // 1. Multiple tables suggest complex structure
        if (tableCount > 3) return true;

        // 2. High font variance
        if (fontVariance > 4) return true;

        // 3. Multiple styles
        if (styleVariance > 8) return true;

        // 4. Presence of complex elements
        const hasFootnotes = doc.getElementsByTagName('w:footnote').length > 0;
        const hasEndnotes = doc.getElementsByTagName('w:endnote').length > 0;
        const hasComments = doc.getElementsByTagName('w:comment').length > 0;
        const hasTextBoxes = doc.getElementsByTagName('w:txbxContent').length > 0;
        
        if (hasFootnotes || hasEndnotes || hasComments || hasTextBoxes) return true;

        // 5. Multiple columns
        const hasColumns = doc.getElementsByTagName('w:cols').length > 0;
        if (hasColumns) return true;

        return false;
    }

    private calculateVariance(values: number[]): number {
        if (values.length === 0) return 0;

        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
        const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
        
        return Math.sqrt(variance); // Return standard deviation
    }
}