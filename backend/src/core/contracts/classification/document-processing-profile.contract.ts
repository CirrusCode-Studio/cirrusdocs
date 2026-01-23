import { DocumentSignals } from "./document-signals.contract";

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

	processing_intent: {
		requires_ocr?: boolean;
		preserve_tables: boolean;
		prefer_layout: 'linear' | 'positional';
		chunk_strategy_hint: 'heading' | 'page' | 'block';
	};

	confidence: number;
	matched_rules: string[];

	signals: DocumentSignals;
}
