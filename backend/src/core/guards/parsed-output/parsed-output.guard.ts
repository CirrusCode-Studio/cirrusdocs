import { CanonicalParsedDocument } from '../../contracts/parsed-output/parsed-output.types';

/**
 * Guard decision result
 */
export type ParsedOutputDecision =
  | { decision: 'ACCEPT' }
  | { decision: 'REJECT'; reason: string }
  | { decision: 'REPARSE'; reason: string; suggested_parser?: string }
  | { decision: 'OCR_FALLBACK'; reason: string };

/**
 * Entry point
 * Called AFTER validateParsedOutput()
 */
export function guardParsedOutput(
  doc: CanonicalParsedDocument
): ParsedOutputDecision {
    // 1️⃣ Hard reject conditions
    const hardReject = checkHardReject(doc);
    if (hardReject) return hardReject;

    // 2️⃣ OCR fallback
    const ocrFallback = checkOCRFallback(doc);
    if (ocrFallback) return ocrFallback;

    // 3️⃣ Re-parse with different parser
    const reparse = checkReparse(doc);
    if (reparse) return reparse;

    // 4️⃣ Accept
    return { decision: 'ACCEPT' };
}

/* ============================================================
 * HARD REJECT
 * ============================================================
 */

function checkHardReject(doc: CanonicalParsedDocument): ParsedOutputDecision | null {
    const d = doc.parse_diagnostics;

    if (d.overall_confidence < 0.25) {
		return {
			decision: 'REJECT',
			reason: 'Overall parse confidence too low',
		};
    }

    if (d.text_coverage.missing_ratio > 0.6) {
		return {
			decision: 'REJECT',
			reason: 'Too much missing text',
		};
    }

    if (d.errors.length > 0) {
		return {
			decision: 'REJECT',
			reason: `Parse errors detected: ${d.errors.join('; ')}`,
		};
    }

    return null;
}

/* ============================================================
 * OCR FALLBACK
 * ============================================================
 */

function checkOCRFallback(doc: CanonicalParsedDocument): ParsedOutputDecision | null {
	const d = doc.parse_diagnostics;

	if (!d.ocr_used && d.text_coverage.detected_ratio < 0.7) {
		return {
		decision: 'OCR_FALLBACK',
		reason: 'Low text coverage without OCR',
		};
	}

	return null;
}

/* ============================================================
 * RE-PARSE STRATEGY
 * ============================================================
 */

function checkReparse(doc: CanonicalParsedDocument): ParsedOutputDecision | null {
	const d = doc.parse_diagnostics;

	// layout too complex for current parser
	if (d.layout_complexity === 'high') {
		return {
		decision: 'REPARSE',
		reason: 'High layout complexity',
		suggested_parser: suggestParser(doc.parser.name),
		};
	}

	// tables expected but detection failed
	if (
		d.table_detection.expected !== undefined &&
		d.table_detection.detected < d.table_detection.expected
	) {
		return {
		decision: 'REPARSE',
		reason: 'Table detection incomplete',
		suggested_parser: 'docling',
		};
	}

	return null;
}

/* ============================================================
 * PARSER SUGGESTION (SIMPLE HEURISTIC)
 * ============================================================
 */

function suggestParser(current: string): string | undefined {
	const fallbackMap: Record<string, string> = {
		unstructured: 'docling',
		pdfplumber: 'docling',
		docling: 'unstructured',
	};

	return fallbackMap[current];
}
