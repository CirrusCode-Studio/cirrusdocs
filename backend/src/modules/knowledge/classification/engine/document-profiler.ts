// engine/document-profiler.ts
import { RuleEngine } from './rule-engine';

export class DocumentProfiler {
    constructor(
        private readonly ruleEngine: RuleEngine,
    ) {}

    profile(docId, signals) {
        const matchedRules = this.ruleEngine.evaluate(signals);

        if (!matchedRules.length) {
        return {
            docId,
            content_category: 'textual',
            structure_confidence: 'low',
            layout_complexity: 'simple',
            ocr_required: 'no',
            table_density: 'low',
            preferred_pipeline: 'GENERIC_PIPELINE',
            confidence: 0.4,
            signals,
            matched_rules: [],
        };
        }

        const topRule = matchedRules[0];
        const profile = topRule.produce(signals);

        return {
            docId,
            ...profile,
            confidence: topRule.confidence,
            signals,
            matched_rules: matchedRules.map(r => r.id),
        };
    }
}
