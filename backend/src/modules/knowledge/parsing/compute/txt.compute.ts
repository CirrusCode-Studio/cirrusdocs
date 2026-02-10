import { BaseCompute } from './base-compute.interface';
import { DocumentProcessingProfile } from '@/core/contracts/classification/document-processing-profile.contract';
import { RawParseResult } from '@/core/contracts/parsing/raw-parse-result.contract';
import { ParserCapability } from '../../classification/@types/parser-capability';
import { ParseExecutionContext } from '../engine/parse-execution-context';
import { RawBlock } from '@/core/contracts/parsing/raw-parse-result.contract';
import { randomUUID } from 'crypto';

export class TxtCompute implements BaseCompute {
    name = 'txt-parser';
    version = 'node-1.0';

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
            traceId: ctx.docId,
        });

        const text = input.toString('utf-8');
        
        const blocks: RawBlock[] = text
            .split(/\n{2,}/g)
            .map((chunk) => chunk.trim())
            .filter(Boolean)
            .map((chunk) => ({
                id: randomUUID(),

                source_engine: this.name,   
                page_number: 1,   

                type: 'text',
                text: chunk,

                confidence: 1.0,

                layout_hints: {
                    estimated_lines: chunk.split('\n').length,
                }
            }));


        return {
            engines_used: [{
                name: this.name,
                version: this.version,
                vendor: 'native',
            }],
            blocks,
        }
    }
}
