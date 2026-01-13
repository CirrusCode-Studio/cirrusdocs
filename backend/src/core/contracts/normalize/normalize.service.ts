import {
  NormalizeInput,
  NormalizeOutput,
  NormalizeOptions,
} from './normalize.contract';
import { Block } from '../parsed-output';

export class NormalizeService {
    normalize(input: NormalizeInput): NormalizeOutput {
        const options = this.resolveOptions(input.options);
        const report = this.createEmptyReport();

        const doc = structuredClone(input.parsed_document);

        doc.pages.forEach(page => {
        page.blocks = page.blocks
            .map(block => this.normalizeBlock(block, options, report))
            .filter((block): block is Block => block !== null);
        });

        return {
        normalized_document: doc,
        normalize_report: report,
        };
    }

    /* ===================================================== */

    private normalizeBlock(
        block: Block,
        options: NormalizeOptions,
        report: any
    ): Block | null {
        if (block.confidence !== undefined &&
            block.confidence < options.confidence_threshold) {
            report.removed_blocks++;
            return null;
        }

        let modified = false;

        if (block.content.type === 'text') {
            let text = block.content.text;

            if (options.unicode_normalization) {
                text = text.normalize('NFC');
            }

            if (options.whitespace_collapse) {
                text = text.replace(/\s+/g, ' ').trim();
            }

            if (text !== block.content.text) {
                block.content.text = text;
                modified = true;
            }

            if (!text) {
                report.removed_blocks++;
                return null;
            }
        }

        if (block.block_type === 'header' || block.block_type === 'footer') {
            if (options.footer_header_handling === 'remove') {
                report.removed_blocks++;
                return null;
            }

            if (options.footer_header_handling === 'mark') {
                block.logical_structure.section_path = ['__HEADER_OR_FOOTER__'];
                modified = true;
            }
        }

        if (modified) {
        report.modified_blocks++;
        }

        return block;
    }

    /* ===================================================== */

    private resolveOptions(
        opts?: NormalizeOptions
    ): NormalizeOptions {
        return {
            unicode_normalization: true,
            whitespace_collapse: true,
            remove_empty_blocks: true,
            footer_header_handling: 'mark',
            confidence_threshold: 0.3,
            ...opts,
        };
    }

    private createEmptyReport() {
        return {
            applied_rules: [
                'unicode_normalization',
                'whitespace_collapse',
                'confidence_filter',
                'header_footer_handling',
            ],
            removed_blocks: 0,
            modified_blocks: 0,
            warnings: [],
        };
    }
}
