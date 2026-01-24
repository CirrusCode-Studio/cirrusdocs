import { BaseParser } from './base-parser.interface';
import { RawParseResult } from '../raw/raw-parse-result';
import { PyComputeClient } from '../client/py-compute-client';
import { ParserCapability } from '../../classification/@types/parser-capability';
import { ParseExecutionContext } from '../engine/parse-execution-context';

export class PdfTextParser implements BaseParser {
    name = 'pdf-text';
    version = 'py-1.0';
    api = '/parse/pdf-text';
    capability: ParserCapability = {
        modality: 'text',
        reliability: 'primary',
        cost: 'low'
    };
    supports(mime: string) {    
        return mime === 'application/pdf';
    }

    async parse(
        input: Buffer,
        ctx: ParseExecutionContext
    ): Promise<RawParseResult> {
        return ctx.pyClient.post(this.api, input);
    }
}
