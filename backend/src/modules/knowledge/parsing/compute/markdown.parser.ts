import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import { ParserCapability } from "../../classification/@types/parser-capability";
import { RawParseResult } from "../raw/raw-parse-result";
import { BaseParser } from "./base-compute.interface";
import { ParseExecutionContext } from "../engine/parse-execution-context";

export class MarkdownParser implements BaseParser {
    name = 'markdown-parser';
    version = 'py-1.0';
    api = 'parse/markdown';

    capability: ParserCapability = {
        modality: 'text',
        reliability: 'primary',
        cost: 'low',
    };


    supports(profile: DocumentProcessingProfile): boolean {
        return (
            profile.format === 'markdown' ||
            profile.content_category === 'markdown'
        );
    }


    async parse(
        input: Buffer, 
        ctx: ParseExecutionContext): Promise<RawParseResult> {
        
            ctx.logger?.debug(`[PARSER][Markdown] parsing markdown document`, {
            traceId: ctx.traceId,
        });
        return ctx.pyClient.post(this.api, input);
    }
}