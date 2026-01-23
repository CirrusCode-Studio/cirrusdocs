import { PyComputeClient } from "../client/py-compute-client";
import { RawParseResult } from "../raw/raw-parse-result";
import { BaseParser } from "./base-parser.interface";

export class HtmlParser implements BaseParser {
    name = 'html-parser';
    version = 'py-1.0';
    api = 'parse/html';
    capacity: any;

    constructor(
        private readonly client: PyComputeClient,
    ) {}

    supports(mime: string): boolean {
        return mime === 'text/html'
    }

    async parse(input: Buffer): Promise<RawParseResult> {
        return this.client.post(this.api, input); 
    }
}