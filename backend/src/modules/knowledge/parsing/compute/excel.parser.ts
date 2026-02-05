import { ParserCapability } from "../../classification/@types/parser-capability";
import { ParseExecutionContext } from "../engine/parse-execution-context";
import { RawParseResult } from "../raw/raw-parse-result";
import { BaseParser } from "./base-compute.interface";
import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";

export class ExcelParser implements BaseParser {
    name = "excel-parser";
    version = "py-1.0";
    api = "/parse/excel";

    capability: ParserCapability = {
        modality: 'table',
        reliability: 'primary',
        cost: 'medium',
    };

    supports(profile: DocumentProcessingProfile): boolean {
        return (
            profile.ocr_required === 'no' &&
            profile.content_category !== 'textual'
        );
    }

    async parse(
        input: Buffer,
        ctx: ParseExecutionContext
    ): Promise<RawParseResult> {
        ctx.logger?.debug(`[PARSER][Excel] parsing excel document`, {
            traceId: ctx.traceId,
        });

        return ctx.pyClient.post(this.api, input);
    }
}
