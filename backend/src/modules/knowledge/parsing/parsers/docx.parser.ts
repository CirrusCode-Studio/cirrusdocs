import { PyComputeClient } from "../client/py-compute-client";
import { RawParseResult } from "../raw/raw-parse-result";
import { BaseParser } from "./base-parser.interface";

export class DocxParser implements BaseParser {
    name = 'docx-parser';
    version = 'py-1.0';
    api = '/parse/docx'
    capacity: any;

    constructor(
        private readonly client: PyComputeClient,
    ) {}

    supports(mime: string): boolean {
        return mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            mime === 'application/msword';
    }

    async parse(input: Buffer): Promise<RawParseResult> {
        return this.client.post(this.api, input);       
    }
}