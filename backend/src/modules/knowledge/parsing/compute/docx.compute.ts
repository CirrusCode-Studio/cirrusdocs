import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import { ParserCapability } from "../../classification/@types/parser-capability";
import { PyComputeClient } from "../client/py-compute-client";
import { ParseExecutionContext } from "../engine/parse-execution-context";
import { RawParseResult } from "@/core/contracts/parsing/raw-parse-result.contract";
import { BaseCompute } from "./base-compute.interface";

export class DocxCompute implements BaseCompute {
    name = 'docx-parser';
    version = 'py-1.0';
    api = '/parse/docx'
    capability: ParserCapability = {
        modality: 'text',
        reliability: 'primary',
        cost: 'low'
    }

    supports(profile: DocumentProcessingProfile): boolean {
        return profile.ocr_required === 'no' &&
            (profile.content_category === 'textual' ||
             profile.content_category === 'academic' ||
             profile.content_category === 'technical') &&
            profile.processing_intent.prefer_layout === 'linear';
    }
    async parse(
        input: Buffer,
        ctx: ParseExecutionContext
    ): Promise<RawParseResult> {
        ctx.logger?.debug(`[PARSER][DOCX] parsing docx document`, {
            traceId: ctx.docId,
        });
        
        return ctx.pyClient.post(this.api, input);
    }
}