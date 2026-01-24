import { DocumentProcessingProfile } from '@/core/contracts/classification/document-processing-profile.contract';
import { RawParseResult } from '../raw/raw-parse-result';
import { BaseParser } from './base-parser.interface';
import { ParserCapability } from '../../classification/@types/parser-capability';
import { ParseExecutionContext } from '../engine/parse-execution-context';

export class TxtParser implements BaseParser {
    name = 'txt-parser';
    version = 'node-1.0';
    api = '';
    capability: ParserCapability = {
        modality: 'text',
        reliability: 'primary',
        cost: 'low',
    };

    supports(profile: DocumentProcessingProfile): boolean {
        return (
            profile.content_category === 'textual' &&
            profile.layout_complexity === 'simple'
        );
    }

    async parse(
        input: Buffer,
        ctx: ParseExecutionContext
    ): Promise<RawParseResult> {
        ctx.logger?.debug(`[PARSER][TXT] parsing plain text`, {
            traceId: ctx.traceId,
        });

        return ctx.pyClient.post(this.api, input);
    }
}
