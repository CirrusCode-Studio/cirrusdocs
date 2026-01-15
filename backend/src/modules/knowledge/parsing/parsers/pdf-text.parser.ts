import { BaseParser } from './base-parser.interface';
import { RawParseResult } from '../raw/raw-parse-result';
import { Block } from '@/core/contracts/parsed-output';

export class PdfTextParser implements BaseParser {
    name = 'pdf-text';
    version = '1.0';

    supports(mime: string) {
        return mime === 'application/pdf';
    }

    async parse(input: Buffer): Promise<RawParseResult> {
        // pseudo: replace bằng pdfjs
        const blocks: Block[] = [];

        blocks.push({
            block_id: crypto.randomUUID(),
            parser_source: this.name,
            page_number: 1,
            text: 'Introduction',
            confidence: 0.95,
        });

        return {
            engine: this.name,
            blocks,
            ocr_used: false,
        };
    }
}
