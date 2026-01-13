import {
	ParsedDocument,
	Page,
	Block,
	BlockType,
	TableContent,
} from '../../contracts/parsed-output/parsed-output.types';

/**
 * Validation Error with context
 */
export class ParsedOutputValidationError extends Error {
	constructor(message: string) {
		super(`[ParsedOutputValidationError] ${message}`);
	}
}

/**
 * Entry point
 */
export const validateParsedOutput = (doc: ParsedDocument): void => {
	validateRoot(doc);
	validatePages(doc.pages);
	validateDiagnostics(doc);
}

/* ============================================================
 * ROOT LEVEL
 * ============================================================
 */

const validateRoot = (doc: ParsedDocument) => {
	if (!doc) {
		throw new ParsedOutputValidationError('Document is null or undefined');
	}

	if (doc.contract_version !== '1.0') {
		throw new ParsedOutputValidationError(
		`Unsupported contract_version: ${doc.contract_version}`
		);
	}

	if (!doc.parser?.name || !doc.parser?.version) {
		throw new ParsedOutputValidationError('Missing parser info');
	}

	if (!doc.document_metadata?.document_id) {
		throw new ParsedOutputValidationError('Missing document_id');
	}

	if (!Array.isArray(doc.pages) || doc.pages.length === 0) {
		throw new ParsedOutputValidationError('Document must contain at least 1 page');
	}
}

/* ============================================================
 * PAGE LEVEL
 * ============================================================
 */

function validatePages(pages: Page[]) {
	const pageIds = new Set<string>();

	pages.forEach((page, pageIndex) => {
		if (!page.page_id) {
		throw new ParsedOutputValidationError(
			`Page at index ${pageIndex} missing page_id`
		);
		}

		if (pageIds.has(page.page_id)) {
		throw new ParsedOutputValidationError(
			`Duplicate page_id detected: ${page.page_id}`
		);
		}
		pageIds.add(page.page_id);

		if (typeof page.page_number !== 'number' || page.page_number < 1) {
		throw new ParsedOutputValidationError(
			`Invalid page_number on page ${page.page_id}`
		);
		}

		if (!Array.isArray(page.blocks)) {
		throw new ParsedOutputValidationError(
			`Page ${page.page_id} blocks must be an array`
		);
		}

		validateBlocks(page.blocks, page.page_id);
	});
}

/* ============================================================
 * BLOCK LEVEL
 * ============================================================
 */

function validateBlocks(blocks: Block[], pageId: string) {
	const blockIds = new Set<string>();
	let lastPageIndex = -1;

	blocks.forEach((block, index) => {
		if (!block.block_id) {
		throw new ParsedOutputValidationError(
			`Block at index ${index} on page ${pageId} missing block_id`
		);
		}

		if (blockIds.has(block.block_id)) {
		throw new ParsedOutputValidationError(
			`Duplicate block_id detected: ${block.block_id}`
		);
		}
		blockIds.add(block.block_id);

		validateBlockType(block.block_type, block.block_id);

		validateOrdering(block, index, pageId, lastPageIndex);
		lastPageIndex = block.order.page_index;

		validateLogicalStructure(block);
		validatePhysicalLayout(block, pageId);
		validateContent(block);
	});
}

/* ============================================================
 * ORDERING
 * ============================================================
 */

function validateOrdering(
	block: Block,
	index: number,
	pageId: string,
	lastPageIndex: number
) {
	if (!block.order) {
		throw new ParsedOutputValidationError(
		`Block ${block.block_id} missing order info`
		);
	}

	const { global_index, page_index } = block.order;

	if (typeof global_index !== 'number' || global_index < 0) {
		throw new ParsedOutputValidationError(
		`Invalid global_index on block ${block.block_id}`
		);
	}

	if (typeof page_index !== 'number' || page_index < 0) {
		throw new ParsedOutputValidationError(
		`Invalid page_index on block ${block.block_id} (page ${pageId})`
		);
	}

	if (page_index <= lastPageIndex) {
		throw new ParsedOutputValidationError(
		`Non-monotonic page_index on page ${pageId} at block ${block.block_id}`
		);
	}
}

/* ============================================================
 * TYPE & STRUCTURE
 * ============================================================
 */

function validateBlockType(type: BlockType, blockId: string) {
	const allowed: BlockType[] = [
		'heading',
		'paragraph',
		'list',
		'table',
		'figure',
		'code',
		'header',
		'footer',
		'unknown',
	];

	if (!allowed.includes(type)) {
		throw new ParsedOutputValidationError(
		`Invalid block_type "${type}" on block ${blockId}`
		);
	}
}

function validateLogicalStructure(block: Block) {
	const { logical_structure } = block;

	if (block.block_type === 'heading') {
		if (
		typeof logical_structure?.heading_level !== 'number' ||
		logical_structure.heading_level < 1
		) {
		throw new ParsedOutputValidationError(
			`Heading block ${block.block_id} must have valid heading_level`
		);
		}
	}

	if (block.block_type === 'unknown') {
		if (!logical_structure?.unknown_reason) {
		throw new ParsedOutputValidationError(
			`Unknown block ${block.block_id} must specify unknown_reason`
		);
		}
	}
}

/* ============================================================
 * PHYSICAL LAYOUT
 * ============================================================
 */

function validatePhysicalLayout(block: Block, pageId: string) {
	const layout = block.physical_layout;
	if (!layout) return;

	if (layout.page_number < 1) {
		throw new ParsedOutputValidationError(
		`Invalid physical_layout.page_number on block ${block.block_id}`
		);
	}

	if (layout.bbox) {
		const { x1, y1, x2, y2 } = layout.bbox;
		if (x2 <= x1 || y2 <= y1) {
		throw new ParsedOutputValidationError(
			`Invalid bbox on block ${block.block_id}`
		);
		}
	}
}

/* ============================================================
 * CONTENT VALIDATION
 * ============================================================
 */

function validateContent(block: Block) {
	const content = block.content;

	if (!content || !content.type) {
		throw new ParsedOutputValidationError(
		`Block ${block.block_id} missing content`
		);
	}

	switch (content.type) {
		case 'text':
		if (!content.text) {
			throw new ParsedOutputValidationError(
			`Text block ${block.block_id} has empty text`
			);
		}
		break;

		case 'list':
		if (!Array.isArray(content.items)) {
			throw new ParsedOutputValidationError(
			`List block ${block.block_id} items must be array`
			);
		}
		break;

		case 'table':
		validateTableContent(content, block.block_id);
		break;

		case 'code':
		if (!content.code) {
			throw new ParsedOutputValidationError(
			`Code block ${block.block_id} missing code`
			);
		}
		break;

		case 'empty':
		break;

		default:
		throw new ParsedOutputValidationError(
			`Unsupported content type on block ${block.block_id}`
		);
	}
}

/* ============================================================
 * TABLE VALIDATION (HIGH RISK AREA)
 * ============================================================
 */

function validateTableContent(content: TableContent, blockId: string) {
	if (!Array.isArray(content.rows) || content.rows.length === 0) {
		throw new ParsedOutputValidationError(
		`Table block ${blockId} must contain rows`
		);
	}

	content.rows.forEach((row, rowIndex) => {
		if (!Array.isArray(row.cells)) {
		throw new ParsedOutputValidationError(
			`Table block ${blockId} row ${rowIndex} missing cells`
		);
		}

		row.cells.forEach((cell) => {
		if (!cell.cell_id) {
			throw new ParsedOutputValidationError(
			`Table block ${blockId} has cell without cell_id`
			);
		}
		});
	});
}

/* ============================================================
 * DIAGNOSTICS
 * ============================================================
 */

function validateDiagnostics(doc: ParsedDocument) {
    const d = doc.parse_diagnostics;

    if (!d) {
      throw new ParsedOutputValidationError('Missing parse_diagnostics');
    }

    if (d.overall_confidence < 0 || d.overall_confidence > 1) {
      throw new ParsedOutputValidationError(
        'overall_confidence must be between 0 and 1'
      );
    }

    if (!Array.isArray(d.warnings) || !Array.isArray(d.errors)) {
      throw new ParsedOutputValidationError(
        'parse_diagnostics warnings/errors must be arrays'
      );
    }
}