import { BlockContent, BoundingBox, LogicalMetadata, PhysicalMetadata, Provenance } from "@/core/contracts/parsing";
import { BlockType } from "@/core/contracts/parsing";

export interface EngineParseOuput {
    engine: string;
    blocks: any[];
    confidence?: number;
}

export interface FusionDocument {
    document_id: string;

    pages: FusionPage[];

    global_signals: {
        ocr_used: boolean;
        engines_used: string[];
    };
}

export interface FusionPage {
    page_number: number;
    blocks: FusionBlock[];

    page_signals: {
        estimated_columns?: number;
        layout_complexity?: 'simple' | 'multi_column' | 'mixed' | 'unknown';
    };
}

export interface FusionBlock {
    fusion_block_id: string;
    raw_block_id: string;

    source_engine: string;

    content: {
        text?: string
        table_ref?: string
        image_ref?: string
        formula?: string
    };

    layout: {
        page_number: number;
        bbox?: BoundingBox;
        reading_order: number;
        reading_order_confidence?: number;
        column_hints?: number;
    };

    style?: {
        font?: string;
        font_size?: number;
        is_bold?: boolean;
        is_italic?: boolean;
        line_count?: number;
    };

    confidence?: number;
    warnings?: string[];

    raw_type: 'text' | 'table' | 'figure' | 'formula' | 'image' | 'unknown';
}