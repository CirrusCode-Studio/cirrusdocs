import { ParseOrchestrator } from "./parse-orchestrator";
import { FusionEngine } from "../fusion/fusion-engine";
import { CanonicalParsedDocument } from "@/core/contracts/parsed-output";

export class ParseEngine {
    constructor(
        private readonly orchestrator: ParseOrchestrator,
        private readonly fusion: FusionEngine,
    ) {}

    async parse(input: Buffer, mime: string): Promise<CanonicalParsedDocument> {
        const raw = await this.orchestrator.parse(input, mime);
        const blocks = this.fusion.fuse(raw);

        return {
            contract_version: '1.0',
            parser: {
                name: 'cirrus-parser',
                version: '1.0',
                strategy: 'hybrid',
                engines_used: raw.map(r => r.engine),
            },
            document_metadata: {
                document_id: crypto.randomUUID(),
                page_count: 1,
            },
            pages: [
                {
                page_id: 'page-1',
                page_number: 1,
                page_metadata: {
                    layout_complexity: 'unknown',
                    ocr_used: false,
                    has_table: false,
                    has_image: false,
                },
                blocks,
                },
            ],
            parse_diagnostics: {
                overall_confidence: 0.8,
                ocr_used: false,
                text_coverage: {
                    detected_ratio: 1,
                    missing_ratio: 0,
                },
                table_detection: {
                    detected: 0,
                    confidence: 0,
                },
                layout_complexity: 'unknown',
                warnings: [],
                errors: [],
            },
        };
    }
}
