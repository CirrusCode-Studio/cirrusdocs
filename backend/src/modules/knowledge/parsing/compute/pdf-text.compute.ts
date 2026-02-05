import { BaseParser } from "./base-compute.interface";
import { ParserCapability } from "../../classification/@types/parser-capability";
import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import { ParseExecutionContext } from "../engine/parse-execution-context";
import { RawParseResult } from "../raw/raw-parse-result";

export class PdfTextParser implements BaseParser {
    name = 'pdf-text';
    version = 'py-1.0';
    api = '/parse/pdf-text';

    capability: ParserCapability = {
        modality: 'text',
        reliability: 'primary',
        cost: 'low',
    };

    supports(profile: DocumentProcessingProfile): boolean {
        if (profile.ocr_required === 'yes') return false;

        return (
            profile.content_category === 'textual' ||
            profile.content_category === 'academic' ||
            profile.content_category === 'technical' ||
            profile.content_category === 'slide'
        );
    }

    async parse(
        input: Buffer,
        ctx: ParseExecutionContext
    ): Promise<RawParseResult> {
        ctx.logger?.debug(`[PARSER][PDFText] parsing text`, {
            traceId: ctx.traceId,
        });

        return ctx.pyClient.post(this.api, input);
    }
}
