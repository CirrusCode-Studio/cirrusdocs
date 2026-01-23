import { PyComputeClient } from "../client/py-compute-client";
import { RawParseResult } from "../raw/raw-parse-result";
import { BaseParser } from "./base-parser.interface";

export class MarkdownParser implements BaseParser {
    name = 'markdown-parser';
    version = 'py-1.0';
    api = 'parse/markdown';
    capacity: any;

    constructor(
        private readonly client: PyComputeClient,
    ) {}

    supports(mime: string): boolean {
        return mime === 'text/markdown';
    }

    async parse(input: Buffer): Promise<RawParseResult> {
        return this.client.post(this.api, input);
    }
}