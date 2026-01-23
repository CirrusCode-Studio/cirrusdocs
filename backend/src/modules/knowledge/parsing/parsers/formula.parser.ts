import { PyComputeClient } from './../client/py-compute-client';
import { RawParseResult } from './../raw/raw-parse-result';
import { BaseParser } from "./base-parser.interface";

export class FormulaParser implements BaseParser {
    name = 'formula-parser';
    version = '1.0';
    capacity: any;
    api = '/parse/fomula';

    constructor(
        private readonly client: PyComputeClient
    ) {}
    supports(mime: string): boolean {
        return mime === 'application/formula';
    }

    async parse(input: Buffer): Promise<RawParseResult> {
        return this.client.post(this.api, input);
    }
}