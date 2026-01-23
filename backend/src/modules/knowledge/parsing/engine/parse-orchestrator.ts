// src/modules/knowledge/parsing/engine/parse-orchestrator.ts
import { BaseParser } from '../parsers/base-parser.interface';
import { RawParseResult } from '../raw/raw-parse-result';
import { ParseInput } from './parse-engine';

export class ParseOrchestrator {
    constructor(private readonly parsers: BaseParser[]) {}

    async run(input: ParseInput): Promise<RawParseResult[]> {
        const results: RawParseResult[] = [];

        for (const parser of this.parsers) {
            if (!parser.supports(input.mime)) continue;
                results.push(await parser.parse(input.buffer));
        }

        return results;
    }
}
