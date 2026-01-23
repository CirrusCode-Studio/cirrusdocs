import { BaseParser } from './base-parser.interface';
import { RawParseResult } from '../raw/raw-parse-result';
import { PyComputeClient } from '../client/py-compute-client';

export class TxtParser implements BaseParser {
    name = 'txt-parser';
    version = 'py-1.0';
    api = '/parse/txt';
    capacity: any;
    
    constructor(
        private readonly client: PyComputeClient
    ){}

    supports(mime: string) {    
        return mime === 'application/txt';
    }

    async parse(input: Buffer): Promise<RawParseResult> {
        return this.client.post(this.api, input);
    }
}
