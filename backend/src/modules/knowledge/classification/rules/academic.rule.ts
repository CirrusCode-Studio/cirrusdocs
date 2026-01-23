import { ClassificationRule } from "./rule.interface";
import { DocumentSignals } from "@/core/contracts/classification/document-signals.contract";
import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";

export class AcademicRule implements ClassificationRule {
    name = "ACADEMIC_RULE";
    weight = 0.6;

    match(signals: DocumentSignals): boolean {
        return (
        signals.structural.headingCount >= 10 &&
        signals.structural.tableCount >= 3 &&
        signals.structural.avgTextPerPage > 800
        );
    }

    apply(
        current: Partial<DocumentProcessingProfile>
    ): Partial<DocumentProcessingProfile> {
        return {
        ...current,
        content_category: "academic",
        structure_confidence: "high",
        table_density: "medium",
        processing_intent: {
                ...current.processing_intent,
                preserve_tables: true,
                chunk_strategy_hint: "heading",
                prefer_layout: "linear",
            },
        };
    }
}
