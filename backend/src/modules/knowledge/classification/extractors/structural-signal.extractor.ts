import { DocumentSignals } from "@/core/contracts/classification/document-signals.contract";

export class StructuralSignalExtractor {
    extract(parsedDoc): DocumentSignals['structural'] {
        const pages = parsedDoc.pages.slice(0, 5);

        let textCount = 0;
        let imageOnlyPages = 0;
        let headingCount = 0;
        let tableCount = 0;

        for (const page of pages) {
        const textBlocks = page.blocks.filter(b =>
            ['paragraph', 'heading'].includes(b.block_type),
        );

        if (textBlocks.length === 0) imageOnlyPages++;

            textCount += textBlocks.length;
            headingCount += page.blocks.filter(b => b.block_type === 'heading').length;
            tableCount += page.blocks.filter(b => b.block_type === 'table').length;
        }

        return {
            avgTextPerPage: textCount / pages.length,
            imageOnlyPageRatio: imageOnlyPages / pages.length,
            headingCount,
            tableCount,
            fontVariance: parsedDoc.parse_diagnostics.font_variance ?? 0,
        };
    }
}
