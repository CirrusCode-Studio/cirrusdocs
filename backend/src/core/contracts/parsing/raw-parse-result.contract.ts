import { BoundingBox } from "@/core/contracts/parsing";

export interface RawBlock {
    id: string;

    // provenance
    source: {
        engine: string;
        version?: string;
    };

    page: number;

    // physical / structural signals ONLY
    bbox?: BoundingBox;

    content?: {
        text?: string;
        tokens?: string[];
        binary_ref?: string; // image / table snapshot / external blob
    };

    physical_metadata?: {
        font?: string;
        font_size?: number;
        is_bold?: boolean;
        is_italic?: boolean;
        line_count?: number;
    };

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

    signals?: {
        ocr_used?: boolean;
        page_count?: number;
    };

    errors?: string[];
}
