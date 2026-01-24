import { DocumentProcessingProfile } from '@/core/contracts/classification/document-processing-profile.contract';
import { ParserCapability } from '../../classification/@types/parser-capability';
import { ParseExecutionContext } from '../engine/parse-execution-context';
import { PyComputeClient } from './../client/py-compute-client';
import { RawParseResult } from './../raw/raw-parse-result';
import { BaseParser } from "./base-parser.interface";

export class FormulaParser implements BaseParser {
    name = 'formula-parser';
    version = '1.0';
    capability: ParserCapability = {
        modality: 'formula',
        reliability: 'primary',
        cost: 'low'
    };
    api = '/parse/fomula';

    supports(profile: DocumentProcessingProfile): boolean {
        return profile.content_category === 'academic' ||
               profile.content_category === 'technical';
    }

    async parse(
        input: Buffer, 
        ctx: ParseExecutionContext
    ): Promise<RawParseResult> {
        ctx.logger?.debug(`[PARSER][Formula] parsing formulas`, {
            traceId: ctx.traceId,
        });
        
        return ctx.pyClient.post(this.api, input);    
    }
}