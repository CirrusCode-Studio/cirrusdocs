import { CanonicalParsedDocument } from "../parsing";

export interface NormalizeInput {
    parsed_document: CanonicalParsedDocument;

    options?: NormalizeOptions;
}

export interface NormalizeOutput {
    normalized_document: CanonicalParsedDocument;

    normalize_report: NormalizeReport;
}

export interface NormalizeOptions {
    unicode_normalization?: boolean;   // NFC
    whitespace_collapse?: boolean;
    remove_empty_blocks?: boolean;

    footer_header_handling?: 'keep' | 'mark' | 'remove';

    confidence_threshold?: number; // default 0.3
}

export interface NormalizeReport {
    applied_rules: string[];

    removed_blocks: number;

    modified_blocks: number;

    warnings: string[];
}
