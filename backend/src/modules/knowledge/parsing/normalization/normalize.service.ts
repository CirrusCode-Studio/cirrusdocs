import { CanonicalParsedDocument, Block } from '@/core/contracts/parsing';
import {
  NormalizedDocument,
  NormalizedBlock,
} from './normalize-block.contract';

export class NormalizeService {
    normalize(doc: CanonicalParsedDocument): NormalizedDocument {
        const stats = {
            original_block_count: 0,
            normalized_block_count: 0,
            merged_blocks: 0,
            removed_blocks: 0,
        };

        const pages = doc.pages.map(page => {
        let blocks = [...page.blocks];
        stats.original_block_count += blocks.length;

        blocks = this.sortBlocks(blocks);
        blocks = this.normalizeText(blocks);
        blocks = this.mergeParagraphs(blocks, stats);
        blocks = this.removeNoise(blocks, stats);
        blocks = this.resolveHierarchy(blocks);

        stats.normalized_block_count += blocks.length;

        return {
            page_number: page.page_number,
            blocks: blocks.map(b => ({
            ...b,
            normalized: true,
            })),
        };
        });

        return {
        document_id: doc.document_metadata.document_id,
        pages,
        stats,
        };
    }

    // ---------- STAGES ----------

    private sortBlocks(blocks: Block[]): Block[] {
        return blocks.sort(
        (a, b) => a.order.global_index - b.order.global_index,
        );
    }

    private normalizeText(blocks: Block[]): Block[] {
        return blocks.map(block => {
        if (block.content.type !== 'text') return block;

        return {
            ...block,
            content: {
            ...block.content,
            text: block.content.text
                .replace(/\s+/g, ' ')
                .trim(),
            normalized: true,
            },
        };
        });
    }

    private mergeParagraphs(
        blocks: Block[],
        stats: any,
    ): Block[] {
        const merged: Block[] = [];
        let buffer: Block | null = null;

        for (const block of blocks) {
        if (
            block.block_type === 'paragraph' &&
            block.content.type === 'text'
        ) {
            if (!buffer) {
            buffer = { ...block };
            } else {
            buffer.content.text +=
                ' ' + block.content.text;
            stats.merged_blocks++;
            }
        } else {
            if (buffer) {
            merged.push(buffer);
            buffer = null;
            }
            merged.push(block);
        }
        }

        if (buffer) merged.push(buffer);

        return merged;
    }

    private removeNoise(
        blocks: Block[],
        stats: any,
    ): Block[] {
        return blocks.filter(block => {
        if (
            block.block_type === 'header' ||
            block.block_type === 'footer'
        ) {
            stats.removed_blocks++;
            return false;
        }
        return true;
        });
    }

    private resolveHierarchy(blocks: Block[]): Block[] {
        let currentSection: string[] = [];

        return blocks.map(block => {
        if (
            block.block_type === 'heading' &&
            block.logical.heading_level
        ) {
            currentSection = [
            block.content.type === 'text'
                ? block.content.text
                : 'Unknown',
            ];
        }

        return {
            ...block,
            logical: {
            ...block.logical,
            section_path:
                currentSection.length > 0
                ? [...currentSection]
                : undefined,
            },
        };
        });
    }
}
