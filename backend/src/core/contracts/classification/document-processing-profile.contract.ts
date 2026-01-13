import { DocumentSignals } from './document-signals.contract';

export interface DocumentProcessingProfile {
  docId: string;

  content_category:
    | 'textual'
    | 'technical'
    | 'academic'
    | 'slide'
    | 'scanned';

  structure_confidence: 'high' | 'medium' | 'low';

  layout_complexity: 'simple' | 'mixed' | 'complex';

  ocr_required: 'yes' | 'no' | 'maybe';

  table_density: 'low' | 'medium' | 'high';

  preferred_pipeline: string;
  fallback_pipeline?: string;

  confidence: number;

  signals: DocumentSignals;

  matched_rules: string[];
}