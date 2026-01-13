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

export interface ParsedDocument {
    contract_version: '1.0';
    parser: ParserInfo;
    document_metadata: DocumentMetadata;
    pages: Page[];
    parse_diagnostics: ParseDiagnostics;
}

export interface ParserInfo {
    name: string;
    version: string;
    execution_id?: string;
}

export interface DocumentMetadata {
    document_id: string;     
    title?: string;
    author?: string;
    language?: string;
    source?: string;         
    created_at?: string;
}

export interface Page {
    page_id: string;
    page_number: number;
    blocks: Block[];
    page_metadata: PageMetadata;
}

export interface PageMetadata {
    layout_complexity: 'simple' | 'multi_column' | 'mixed' | 'unknown';
    ocr_used: boolean;
    confidence?: number;
}

export interface Block {
    block_id: string;      // stable, never re-generated
    block_type: BlockType;
    logical_structure: LogicalStructure;
    physical_layout?: PhysicalLayout;
    order: BlockOrder;
    content: BlockContent;
    confidence?: number;   // 0–1
    parser_source?: string; // optional hint
}

export type BlockType =
    | 'heading'
    | 'paragraph'
    | 'list'
    | 'table'
    | 'figure'
    | 'code'
    | 'header'
    | 'footer'
    | 'unknown';

export interface LogicalStructure {
    heading_level?: number; // only if type=heading
    parent_block_id?: string; // hierarchy reference
    section_path?: string[]; // e.g. ["Chapter 1", "Section 2"]
    unknown_reason?: 'ambiguous_layout' | 'low_confidence' | 'parser_failure';
}

export interface PhysicalLayout {
    page_number: number;
    bbox?: BoundingBox;
    column?: number;
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
    | TextContent
    | ListContent
    | TableContent
    | CodeContent
    | EmptyContent;

export interface TextContent {
    type: 'text';
    text: string;
}

export interface ListContent {
    type: 'list';
    items: string[];
}

export interface TableContent {
    type: 'table';

    headers?: TableRow[];

    rows: TableRow[];

    confidence?: number;
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

export interface CodeContent {
    type: 'code';
    code: string;
    language?: string;
}

export interface EmptyContent {
    type: 'empty';
}

export interface ParseDiagnostics {
    overall_confidence: number; // 0–1

    ocr_used: boolean;

    text_coverage: {
        detected_ratio: number;
        missing_ratio: number;
    };

    table_detection: {
        expected?: number;
        detected: number;
        confidence: number;
    };

    layout_complexity: 'low' | 'medium' | 'high';

    warnings: string[];

    errors: string[];
}


