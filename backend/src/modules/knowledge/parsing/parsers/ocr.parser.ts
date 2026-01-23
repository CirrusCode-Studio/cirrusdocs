import { PyComputeClient } from "../client/py-compute-client";
import { RawParseResult } from "../raw/raw-parse-result";
import { BaseParser } from "./base-parser.interface";

export class OCRParser implements BaseParser {
    name = 'ocr-parser';
    version = '1.0';
    api = '/parse/ocr';
    capacity: any;

    constructor(
        private readonly client: PyComputeClient
    ) {
        
    }
    supports(mime: string): boolean {
        return mime === 'application/pdf';
    }
    async parse(input: Buffer): Promise<RawParseResult> {
        return this.client.post(this.api, input);
    }
}