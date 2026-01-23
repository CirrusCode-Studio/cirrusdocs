import { BoundingBox } from "@/core/contracts/parsing";

export interface RawBlock {
    id: string;
    source_engine: string;

    page_number: number;

    bbox?: BoundingBox;

    text?: string;
    table?: unknown;
    image_ref?: string;
    formula?: string;

    confidence?: number;
    metadata?: {
        font?: string;
        font_size?: number;
        is_bold?: boolean;
        is_italic?: boolean;
        num_lines?: number
    }
    reading_order?: number;
    warnings?: string[];
}
