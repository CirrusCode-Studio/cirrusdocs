import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import { PyComputeClient } from "../client/py-compute-client";
import { RawParseResult } from "../raw/raw-parse-result";
import { BaseParser } from "./base-parser.interface";
import { ParseExecutionContext } from "../engine/parse-execution-context";
import { ParserCapability } from "../../classification/@types/parser-capability";

export class HtmlParser implements BaseParser {
    name = 'html-parser';
    version = 'py-1.0';
    api = 'parse/html';
    capability: ParserCapability = {
        modality: 'text',
        reliability: 'primary',
        cost: 'low'
    };

    supports(profile: DocumentProcessingProfile): boolean {
        return (
            profile.ocr_required === 'no' &&
            profile.layout_complexity !== 'complex'
        );
    }


    async parse(input: Buffer, ctx: ParseExecutionContext): Promise<RawParseResult> {
        ctx.logger?.debug(`[PARSER][HTML] parsing HTML document`, {
            traceId: ctx.traceId,
        });

        return ctx.pyClient.post(this.api, input);
    }
}