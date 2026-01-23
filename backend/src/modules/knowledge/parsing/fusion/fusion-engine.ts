import { RawParseResult } from '../raw/raw-parse-result';
import { Block } from '@/core/contracts/parsing';

export class FusionEngine {
    fuse(rawResults: RawParseResult[]): Block[] {
        const blocks: Block[] = [];

        for (const result of rawResults) {
            for (const raw of result.blocks) {
                blocks.push({
                block_id: raw.id,
                block_type: raw.text ? 'paragraph' : 'unknown',
                logical: {
                    order: {
                    global_index: blocks.length,
                    page_index: 0,
                    },
                },
                physical: raw.bbox
                    ? {
                        page_number: raw.page_number,
                        bbox: raw.bbox,
                    }
                    : undefined,
                order: {
                    global_index: blocks.length,
                    page_index: 0,
                },
                content: raw.text
                    ? { type: 'text', text: raw.text }
                    : { type: 'empty' },
                provenance: {
                    source_engine: raw.source_engine,
                    extraction_confidence: raw.confidence,
                },
                });
            }
        }

        return blocks;
    }
}
