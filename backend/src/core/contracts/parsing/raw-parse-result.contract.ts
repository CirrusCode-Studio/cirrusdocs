import { BoundingBox } from "@/core/contracts/parsing";

export interface RawBlock {
    id: string;
    source_engine: string;

    page_number: number;
    type:'text' | 'table' | 'figure' | 'formula' | 'image' | 'unknown'

    bbox?: BoundingBox;

    text?: string;
    table_ref?: string;
    image_ref?: string;
    formula?: string;

    confidence?: number;
    metadata?: {
        font?: string;
        font_size?: number;
        is_bold?: boolean;
        is_italic?: boolean;
        num_lines?: number;
    }

    layout_hints?: {
        estimated_lines?: number;
        reading_order_hint?: number;
    };

    warnings?: string[];
}

export interface RawParseResult {
    engines_used: {
        name: string;
        version?: string;
        vendor?: 'python' | 'native' | 'external';
    }[];

    
    blocks: RawBlock[];
    ocr_used: boolean;
    errors?: string[];
}
