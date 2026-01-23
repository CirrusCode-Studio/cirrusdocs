import { ClassificationRule } from "./rule.interface";
import { DocumentSignals } from "@/core/contracts/classification/document-signals.contract";
import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";

export class ScannedRule implements ClassificationRule {
    name = "SCANNED_RULE";
    weight = 0.9;

    match(signals: DocumentSignals): boolean {
        return signals.structural.likelyScanned === true;
    }

    apply(
        current: Partial<DocumentProcessingProfile>
    ): Partial<DocumentProcessingProfile> {
        return {
        ...current,
        content_category: "scanned",
        ocr_required: "yes",
        structure_confidence: "low",
        processing_intent: {
                ...current.processing_intent,
                requires_ocr: true,
                preserve_tables: false,
                prefer_layout: "positional",
                chunk_strategy_hint: "page",
            },
        };
    }
}
