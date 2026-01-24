import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import { ParserCapability } from "../../classification/@types/parser-capability";
import { RawParseResult } from "../raw/raw-parse-result";
import { BaseParser } from "./base-parser.interface";
import { ParseExecutionContext } from "../engine/parse-execution-context";

export class OCRParser implements BaseParser {
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

    async parse(input: Buffer, ctx: ParseExecutionContext): Promise<RawParseResult> {
        ctx.logger?.debug(`[PARSER][OCR] performing OCR on document`, {
            traceId: ctx.traceId,
        });
        
        return ctx.pyClient.post(this.api, input);
    }
}