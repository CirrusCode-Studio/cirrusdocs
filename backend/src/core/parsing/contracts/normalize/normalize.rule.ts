/**
 * NORMALIZE STEP RULES
 *
 * ALLOWED:
 * - Unicode normalization (NFC)
 * - Whitespace collapse
 * - Remove empty / low-confidence blocks
 * - Mark header/footer
 *
 * FORBIDDEN:
 * - Merge blocks
 * - Change block_type
 * - Infer new semantics
 * - Flatten table
 * - Change heading hierarchy
 */
export const NORMALIZE_RULES = true;