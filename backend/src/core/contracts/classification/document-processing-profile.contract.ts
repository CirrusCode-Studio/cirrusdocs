import { DocumentSignals } from "./document-signals.contract";

export interface DocumentProcessingProfile {
	docId: string;

	content_category:
		| 'textual'
		| 'technical'
		| 'academic'
		| 'slide'
		| 'scanned'
		| 'webpage'
		| 'structured'
		| 'mixed'
		| 'markdown';

	format: 'pdf' | 'docx' | 'pptx' | 'xlsx' | 'html' | 'txt' | 'md' | 'markdown' | 'other';
	
	document_size: 'small' | 'medium' | 'large' | 'extra_large';

	structure_confidence: 'high' | 'medium' | 'low';
	layout_complexity: 'simple' | 'mixed' | 'complex';
	ocr_required: 'yes' | 'no' | 'maybe';
	table_density: 'low' | 'medium' | 'high';

	processing_intent: {
		requires_ocr?: boolean;
		extract_figures?: boolean;
		preserve_tables: boolean;
		prefer_layout: 'linear' | 'positional' | 'adaptive' | 'hierarchical';
		chunk_strategy_hint: 'heading' | 'page' | 'block';
	};

	confidence: number;
	matched_rules: string[];

	signals: DocumentSignals;
}
