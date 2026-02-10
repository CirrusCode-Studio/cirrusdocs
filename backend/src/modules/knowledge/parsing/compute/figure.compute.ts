import { ParserCapability } from "../../classification/@types/parser-capability";
import { ParseExecutionContext } from "../engine/parse-execution-context";
import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import { BaseCompute } from "./base-compute.interface";
import { RawBlock, RawParseResult } from "@/core/contracts/parsing/raw-parse-result.contract";

export class FigureCompute implements BaseCompute {
    readonly name = 'figure-vision';
    readonly version = 'py-1.0';
    readonly api = '/parse/figures';

    readonly capability: ParserCapability = {
        modality: 'figure',
        reliability: 'primary',
        cost: 'medium',
    };

    supports(profile: DocumentProcessingProfile): boolean {
        return profile.processing_intent.extract_figures === true &&
               profile.content_category !== 'textual';
    }

    async parseFromBlocks(
        blocks: RawBlock[],
        ctx: ParseExecutionContext
    ): Promise<RawParseResult> {

        // 1. chọn block ảnh
        const imageBlocks = blocks.filter(b =>
            b.content?.binary_ref && b.bbox
        );

        if (imageBlocks.length === 0) {
            return {
                engines_used: [],
                blocks: [],
            };
        }

        ctx.logger?.debug(`[COMPUTE][FIGURE] send to python`, {
            traceId: ctx.docId,
            imageBlocks: imageBlocks.length,
        });

        // 2. GỌI PYTHON
        const result = await ctx.pyClient.postBlocks<RawParseResult>(
            this.api,
            {
                doc_id: ctx.docId,
                blocks: imageBlocks,
            }
        );

        // 3. provenance do compute layer chịu trách nhiệm
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
