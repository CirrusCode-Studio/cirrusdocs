import { DocumentSignals } from "@/core/contracts/classification/document-signals.contract";

export interface ClassificationRule {
    id: string;
    priority: number;

    match(signals: DocumentSignals): boolean;

    produce(signals: DocumentSignals): Partial<{
        content_category: string;
        structure_confidence: string;
        layout_complexity: string;
        ocr_required: string;
        table_density: string;
        preferred_pipeline: string;
    }>;

    confidence: number;
}