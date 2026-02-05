import { FusionDocument, FusionPage } from "../fusion-input.contract";
import { CanonicalParsedDocument } from "@/core/contracts/parsing";

export class FusionToCanonicalMapper {
    map(doc: FusionDocument): CanonicalParsedDocument {
        return {
            contract_version: '1.0',
            parser: {
                name: 'fusion-parser',
                version: '1.0',
                strategy: 'hybrid',
                engines_used: doc.global_signals.engines_used,
            },
            document_metadata: {
                document_id: doc.document_id,
                page_count: doc.pages.length,
            },
            pages: doc.pages.map(page => this.mapPage(page)),
            parse_diagnostics: {
                overall_confidence: 0.8, // aggregate later
                ocr_used: doc.global_signals.ocr_used,
                text_coverage: { detected_ratio: 0 },
                table_detection: { detected: 0, confidence: 0 },
                layout_complexity: 'unknown',
                warnings: [],
                errors: [],
            }
        };
    }

    private mapPage(page: FusionPage) {
        return 
    }
}