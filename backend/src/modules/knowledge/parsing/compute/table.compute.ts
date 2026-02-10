import { BaseCompute } from './base-compute.interface';
import { ParserCapability } from "../../classification/@types/parser-capability";
import { ParseExecutionContext } from "../engine/parse-execution-context";
import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import { RawParseResult } from '@/core/contracts/parsing/raw-parse-result.contract';

export class TableCompute implements BaseCompute {
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
            traceId: ctx.docId,
        });

        return ctx.pyClient.postFile(this.api, input);
    }
}

