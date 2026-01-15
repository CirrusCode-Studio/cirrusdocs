import { RawParseResult } from '../raw/raw-parse-result';

export interface BaseParser {
    name: string;
    version: string;

    supports(mime: string): boolean;

    parse(input: Buffer): Promise<RawParseResult>;
}
