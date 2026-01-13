import { ClassificationRule } from "./rule.interface";

export class AcademicRule implements ClassificationRule {
    id = 'ACADEMIC_RULE';
    priority = 80;
    confidence = 0.8;

    match(signals) {
        return (
            signals.structural.headingCount > 10 &&
            signals.structural.tableCount > 3
        );
    }

    produce() {
        return {
            content_category: 'academic',
            structure_confidence: 'high',
            table_density: 'medium',
            preferred_pipeline: 'ACADEMIC_PIPELINE',
            fallback_pipeline: 'GENERIC_TEXT_PIPELINE',
        };
    }
}