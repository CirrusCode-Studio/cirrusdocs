import { ClassificationRule } from './rule.interface';

export class ScannedDocumentRule implements ClassificationRule {
    id = 'SCANNED_DOC_RULE';
    priority = 100;
    confidence = 0.9;

    match(signals) {
        return (
            signals.structural.imageOnlyPageRatio > 0.6 &&
            signals.structural.avgTextPerPage < 3
        );
    }

    produce() {
        return {
            content_category: 'scanned',
            ocr_required: 'yes',
            layout_complexity: 'complex',
            preferred_pipeline: 'OCR_PIPELINE',
        };
    }
}