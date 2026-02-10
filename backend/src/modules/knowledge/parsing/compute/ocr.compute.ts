import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import { ParserCapability } from "../../classification/@types/parser-capability";
import { RawParseResult } from "@/core/contracts/parsing/raw-parse-result.contract";
import { BaseCompute } from "./base-compute.interface";
import { ParseExecutionContext } from "../engine/parse-execution-context";

export class OCRCompute implements BaseCompute {
    name = 'ocr-parser';
    version = '1.0';
    api = '/parse/ocr';
    capability: ParserCapability = {
        modality: 'ocr',
        reliability: 'fallback',
        cost: 'medium',
    }

    supports(profile: DocumentProcessingProfile): boolean {
        return (
            profile.ocr_required === 'yes' ||
            profile.content_category === 'scanned'
        );
    }

    async parse(
        input: Buffer, 
        ctx: ParseExecutionContext
    ): Promise<RawParseResult> {
        ctx.logger?.debug(`[PARSER][OCR] performing OCR on document`, {
            traceId: ctx.docId,
        });
        
        return ctx.pyClient.post(this.api, input);
    }
}