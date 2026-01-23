import { PyComputeClient } from "../client/py-compute-client";
import { RawParseResult } from "../raw/raw-parse-result";
import { BaseParser } from "./base-parser.interface";

export class ExcelParser implements BaseParser {
    name = "excel-parser";
    version = "py-1.0"
    api = "parse/excel"
    capacity: any;

    constructor(
        private readonly client: PyComputeClient
    ) {}

    supports(mime: string): boolean {
        return mime === 'application/vnd.ms-excel' ||
            mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';    
    }

    async parse(input: Buffer): Promise<RawParseResult> {
        return this.client.post(this.api, input);
    }
}