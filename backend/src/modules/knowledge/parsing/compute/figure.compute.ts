import { ParserCapability } from "../../classification/@types/parser-capability";
import { ParseExecutionContext } from "../engine/parse-execution-context";
import { RawParseResult } from "../raw/raw-parse-result";
import { BaseParser } from "./base-compute.interface";
import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";

export class FigureParser implements BaseParser{
    name = 'figure-parser';
    version = '1.0';
    api = '/parse/figures';
    capability: ParserCapability = {
        modality: 'figure',
        reliability: 'primary',
        cost: 'low',
    };   

    supports(profile: DocumentProcessingProfile): boolean {
        return profile.content_category !== 'textual' && 
            profile.processing_intent.extract_figures === true;
    }
    async parse(
        input: Buffer, 
        ctx: ParseExecutionContext
    ): Promise<RawParseResult> {
        return ctx.pyClient.post(this.api, input); 
    }

}