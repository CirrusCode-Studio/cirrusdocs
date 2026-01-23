import { PyComputeClient } from "../client/py-compute-client";
import { RawParseResult } from "../raw/raw-parse-result";
import { BaseParser } from "./base-parser.interface";

export class PptParser implements BaseParser {
    name = 'ppt-parser';
    version = 'py-1.0';
    api = 'parse/ppt'
    capacity: any;

    constructor(
        private readonly client: PyComputeClient,
    ) {}

    supports(mime: string): boolean {
        return mime === 'application/vnd.ms-powerpoint' || 
            mime === 'application/vnd.openxmlformats-officedocument.presentationml.presentation';    
    }

    async parse(input: Buffer): Promise<RawParseResult> {
        return this.client.post(this.api, input);
    }
}