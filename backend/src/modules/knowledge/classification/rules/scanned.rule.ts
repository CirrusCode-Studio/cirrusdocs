import { ClassificationRule } from './rule.interface';

export class ScannedRule implements ClassificationRule {
    name = 'scanned-rule';
    weight = 0.9;

    match(signals) {
        return signals.structural.likelyScanned === true;
    }

    apply() {
        return {
            content_category: 'scanned',
            ocr_required: 'yes',
            processing_intent: {
                requires_ocr: true,
                preserve_tables: false,
                prefer_layout: 'positional',
                chunk_strategy_hint: 'page',
            },
        };
    }
}
