import { RawParseResult } from '../raw/raw-parse-result';

export interface BaseParser {
    readonly name: string;
    readonly version: string;
    readonly api: string;
    readonly capacity;

    supports(mime: string): boolean;

    parse(input: Buffer): Promise<RawParseResult>;
}
