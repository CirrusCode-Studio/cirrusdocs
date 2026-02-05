import { Strategy } from 'passport-jwt';
/**
 * Parsed Output Contract
 * Versioned, parser-agnostic, lossless-first
 */

/**
 * RULES:
 * - Do NOT normalize text here
 * - Do NOT merge blocks
 * - Do NOT infer meaning
 * - Unknown is better than wrong
 * - Lossless first, reduce later
 */

export interface CanonicalParsedDocument {
    contract_version: '1.0';
    parser: ParserInfo;
    document_metadata: DocumentMetadata;
    pages: Page[];
    parse_diagnostics: ParseDiagnostics;
}

export interface ParserInfo {
    name: string;
    version: string;
    strategy: "single" | "hybrid";
    execution_id?: string;
    engines_used: string[];
}

export interface DocumentMetadata {
    document_id: string;     
    title?: string;
    language?: string;
    author?: string;
    source?: {
        file_name?: string;
        mime_type?: string;
        file_size_bytes?: number;
    }       
    page_count: number;
    created_at?: string;
}

export interface Page {
    page_id: string;
    page_number: number;
    page_metadata: PageMetadata;
    blocks: Block[];
}

export interface PageMetadata {
    layout_complexity: 'simple' | 'multi_column' | 'mixed' | 'unknown';
    ocr_used: boolean;
    has_table: boolean;
    has_image: boolean;
    confidence?: number;
}

export interface Block {
    block_id: string;      // stable, never re-generated
    block_type: BlockType;
    order: BlockOrder;
    logical: LogicalMetadata;
    physical?: PhysicalMetadata;
    content: BlockContent;
    confidence?: number;   // 0–1
    provenance: Provenance;
}

export interface Provenance {
    source_engine: string;
    extraction_confidence?: number;
    warning?: string[];
    unknown_reason?: string;
}

export type BlockType =
    | 'heading'
    | 'paragraph'
    | 'list'
    | 'table'
    | 'figure'
    | 'formula'
    | 'code'
    | 'header'
    | 'footer'
    | 'unknown';

export interface LogicalMetadata {
    heading_level?: number; // only if type=heading
    parent_block_id?: string; // hierarchy reference
    section_path?: string[]; // e.g. ["Chapter 1", "Section 2"]
    reading_role?: "main" | "sidebar" | "caption";
    unknown_reason?: 'ambiguous_layout' | 'low_confidence' | 'parser_failure';
}

export interface PhysicalMetadata {
    page_number: number;
    bbox?: BoundingBox;
    column_index?: number;
    reading_order_confidence?: number; // 0–1
}

export interface BoundingBox {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    unit: 'px' | 'pt' | 'ratio';
}

export interface BlockOrder {
    global_index: number; // across document
    page_index: number;   // within page
}

export type BlockContent =
    | { text: string; normalized?: boolean }
    | { items: string[] }
    | TableContent
    | FigureContent
    | FormulaContent
    | { code: string; language?: string }
    | {};

export interface TableContent {
    type: 'table';

    headers?: TableRow[];
    rows: TableRow[];

    shape: {
        rows: number;
        columns: number;
    }
    confidence?: number;
}

export interface FigureContent {
    image_ref?: string;
    caption?: string;

    ocr_text?: {
        text: string;
        confidence: number;
    }
}

export interface FormulaContent {
    latex?: string;
    mathml?: string;
    text_fallback?: string;

    confidence: number;
}

export interface TableRow {
    cells: TableCell[];
}

export interface TableCell {
    cell_id: string;
    text: string;
    row_index: number;
    column_index: number;
    confidence?: number;
}

export interface ParseDiagnostics {
    overall_confidence: number; // 0–1

    ocr_used: boolean;

    text_coverage: {
        detected_ratio: number;
    };

    table_detection: {
        detected: number;
        confidence: number;
    };

    formula_detection?: {
        detected: number;
        confidence: number;
    };

    layout_complexity: 'low' | 'medium' | 'high' | 'unknown';

    warnings: string[];
    errors: string[];
}