import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import { PyComputeClient } from "../client/py-compute-client";
import { RawParseResult } from "../raw/raw-parse-result";
import { BaseParser } from "./base-compute.interface";
import { ParseExecutionContext } from "../engine/parse-execution-context";
import { ParserCapability } from "../../classification/@types/parser-capability";

export class PptParser implements BaseParser {
    name = 'ppt-parser';
    version = 'py-1.0';
    api = 'parse/ppt';
    capability: ParserCapability = {
        modality: 'slide',
        reliability: 'primary',
        cost: 'low',
    }

    supports(profile: DocumentProcessingProfile): boolean {
        return profile.content_category === 'slide' && 
            profile.processing_intent.prefer_layout === 'positional';
    }

    async parse(
        input: Buffer,
        ctx: ParseExecutionContext
    ): Promise<RawParseResult> {
        ctx.logger?.debug(`[PARSER][PPT] parsing presentation`, {
            traceId: ctx.traceId,
        });

        return ctx.pyClient.post(this.api, input);
    }
}