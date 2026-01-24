import { ParserCapability } from '../../classification/@types/parser-capability';
import { ParseInput } from '../engine/parse-engine';
import { RawParseResult } from '../raw/raw-parse-result';
import { ParseExecutionContext } from '../engine/parse-execution-context';
import { DocumentProcessingProfile } from '@/core/contracts/classification/document-processing-profile.contract';

export interface BaseParser {
    readonly name: string;
    readonly version: string;
    readonly api: string;
    readonly capability: ParserCapability;

    supports(profile: DocumentProcessingProfile): boolean;

    parse(
        input: Buffer,
        ctx: ParseExecutionContext
    ): Promise<RawParseResult>;
}
