import { BaseCompute } from "./base-compute.interface";
import { ParserCapability } from "../../classification/@types/parser-capability";
import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import { ParseExecutionContext } from "../engine/parse-execution-context";
import { RawParseResult } from "@/core/contracts/parsing/raw-parse-result.contract";

export class PdfTextCompute implements BaseCompute {
    readonly name = 'pdf-text';
    readonly version = 'py-1.0';
    readonly api = '/parse/pdf-text';

    readonly capability: ParserCapability = {
        modality: 'text',
        reliability: 'primary',
        cost: 'low',
    };

    supports(profile: DocumentProcessingProfile): boolean {
        if (profile.ocr_required === 'yes') return false;

        return [
            'textual',
            'academic',
            'technical',
            'slide',
        ].includes(profile.content_category);
    }

    async parseFromFile(
        input: Buffer,
        ctx: ParseExecutionContext
    ): Promise<RawParseResult> {
        ctx.logger?.debug(`[COMPUTE][PDF_TEXT] start`, {
            traceId: ctx.docId,
        });

        const result = await ctx.pyClient.postFile<RawParseResult>(
            this.api,
            input,
        );

        // 🔒 Compute layer chịu trách nhiệm provenance
        return {
            engines_used: [
                ...(result.engines_used ?? []),
                {
                    name: this.name,
                    version: this.version,
                    vendor: 'python',
                },
            ],
            blocks: result.blocks,
            signals: result.signals,
            errors: result.errors,
        };
    }
}