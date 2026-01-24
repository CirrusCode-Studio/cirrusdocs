import { DocumentProcessingProfile } from '@/core/contracts/classification/document-processing-profile.contract';
import { ParserCapability } from "../../classification/@types/parser-capability";
import { RawParseResult } from "../raw/raw-parse-result";
import { BaseParser } from "./base-parser.interface";
import { ParseExecutionContext } from '../engine/parse-execution-context';

export class JsonParser implements BaseParser {
    name = 'json-parser';
    version = 'py-1.0';
    api = 'parse/json';
    capability: ParserCapability = {
        modality: 'structured',
        reliability: 'primary',
        cost: 'low',
    }

    supports(profile: DocumentProcessingProfile): boolean {
        return profile.content_category === 'structured' && 
            profile.processing_intent.prefer_layout === 'hierarchical';
    }

    async parse(input: Buffer, ctx: ParseExecutionContext): Promise<RawParseResult> {
        ctx.logger?.debug(`[PARSER][JSON] parsing JSON document`, {
            traceId: ctx.traceId,
        });
        
        return ctx.pyClient.post(this.api, input);
    }
}