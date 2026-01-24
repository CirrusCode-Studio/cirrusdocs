import { ParserCapability } from "../../classification/@types/parser-capability";
import { ParseExecutionContext } from "../engine/parse-execution-context";
import { RawParseResult } from "../raw/raw-parse-result";
import { BaseParser } from "./base-parser.interface";
import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";

export class TableParser implements BaseParser {
    name = 'table-parser';
    version = '1.0';
    capability: ParserCapability = {
        modality: 'table',
        reliability: 'primary',
        cost: 'low',
    };
    api = '/parse/tables';

    supports(profile: DocumentProcessingProfile): boolean {
        const s = profile.signals.structural;

        if (s.tableCount > 0) return true;

        if (
            s.structuredLayoutRatio > 0.4 &&
            s.hasComplexFormatting
        ) return true;

        if (
            profile.processing_intent.preserve_tables &&
            profile.table_density !== 'low'
        ) return true;

        return false;
    }


    async parse(
        input: Buffer,
        ctx: ParseExecutionContext
    ): Promise<RawParseResult> {
        ctx.logger?.debug(`[PARSER][Table] parsing tables`, {
            traceId: ctx.traceId,
        });

        return ctx.pyClient.post(this.api, input);
    }
}

