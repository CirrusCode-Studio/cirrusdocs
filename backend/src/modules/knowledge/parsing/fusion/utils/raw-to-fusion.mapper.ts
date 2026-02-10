import { RawBlock } from "@/core/contracts/parsing/raw-parse-result.contract";
import { FusionBlock } from "../fusion-input.contract"

export const rawToFusionBlock = (raw: RawBlock): FusionBlock => {
    return {
        fusion_block_id: raw.id,
        raw_block_id: raw.id,

        source_engine: raw.source_engine,

        content: {
            text: raw.text,
            table_ref: raw.table_ref ? `table:${raw.id}` : undefined,
            image_ref: raw.image_ref,
            formula: raw.formula,
        },

        layout: {
            page_number: raw.page_number,
            bbox: raw.bbox,
            reading_order: raw.layout_hints?.reading_order_hint ?? -1,
        },

        style: raw.metadata && {
            font: raw.metadata.font,
            font_size: raw.metadata.font_size,
            is_bold: raw.metadata.is_bold,
            is_italic: raw.metadata.is_italic,
            line_count: raw.metadata.num_lines,
        },

        confidence: raw.confidence,
        warnings: raw.warnings,

        raw_type: raw.type ?? 'unknown',
    };
}