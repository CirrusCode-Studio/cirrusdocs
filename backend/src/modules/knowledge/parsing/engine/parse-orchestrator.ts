import { BaseParser } from '../parsers/base-parser.interface';
import { RawParseResult } from '../raw/raw-parse-result';

export class ParseOrchestrator {
    constructor(private readonly parsers: BaseParser[]) {}

    async parse(buffer: Buffer, mime: string): Promise<RawParseResult[]> {
        const results: RawParseResult[] = [];

        for (const parser of this.parsers) {
            if (!parser.supports(mime)) continue;
                results.push(await parser.parse(buffer));
        }

        return results;
    }
}
