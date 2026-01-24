import { ParserCapability } from "../../classification/@types/parser-capability";
import { PyComputeClient } from "../client/py-compute-client";
import { ParseExecutionContext } from "../engine/parse-execution-context";
import { RawParseResult } from "../raw/raw-parse-result";
import { BaseParser } from "./base-parser.interface";

export class TableParser implements BaseParser {
    name = 'table-parser';
    version = '1.0';
    capability: ParserCapability = {
        modality: 'table',
        reliability: 'primary',
        cost: 'low',
    };
    api = '/parse/tables';

    supports(mime: string): boolean {
        return mime === 'application/table';
    }

    async parse(
        input: Buffer,
        ctx: ParseExecutionContext
    ): Promise<RawParseResult> {
         return ctx.pyClient.post(this.api, input);
    }
}

