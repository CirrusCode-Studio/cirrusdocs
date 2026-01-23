import { ClassificationRule } from "./rule.interface";
import { DocumentSignals } from "@/core/contracts/classification/document-signals.contract";
import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import { DEFAULT_PROCESSING_INTENT } from "../default/default-processing-intent";

export class SlideRule implements ClassificationRule {
    name = "SLIDE_RULE";
    weight = 0.4;

    match(signals: DocumentSignals): boolean {
        return (
        signals.structural.avgTextPerPage < 300 &&
        signals.deterministic.pageCount >= 10
        );
    }

    apply(
        current: Partial<DocumentProcessingProfile>
    ): Partial<DocumentProcessingProfile> {
        return {
            ...current,
            content_category: "slide",
            layout_complexity: "mixed",
            structure_confidence: "medium",
            processing_intent: {
                ...DEFAULT_PROCESSING_INTENT,
                ...current.processing_intent,
                chunk_strategy_hint: "page",
            },
        };
    }
}
