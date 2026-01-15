import { FusionRule } from '../fusion-rule.interface';
import { FusionContext } from '../fusion-context';

export class ParagraphFusionRule implements FusionRule {
    readonly name = 'paragraph-rule';
    readonly blockType = 'paragraph';
    readonly priority = 20;

    supports(block: any): boolean {
        return block.block_type === 'paragraph';
    }

    apply(blocks: any[], context: FusionContext): void {
        const paragraph = blocks[0];

        const text = paragraph.content?.text;

        if (!text || text.trim().length === 0) {
            context.warn(
                `Paragraph ${paragraph.block_id} empty or invalid`,
            );
            paragraph.flags = {
                ...(paragraph.flags ?? {}),
                empty: true,
            };
        }

        // Optional OCR quality hint
        if (paragraph.source?.ocr_confidence !== undefined) {
            if (paragraph.source.ocr_confidence < 0.5) {
                paragraph.flags = {
                ...(paragraph.flags ?? {}),
                low_ocr_confidence: true,
                };
            }
        }
    }
}
