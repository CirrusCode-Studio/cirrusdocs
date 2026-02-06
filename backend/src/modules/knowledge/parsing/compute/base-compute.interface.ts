import { ParserCapability } from '../../classification/@types/parser-capability';
import { RawParseResult } from '@/core/contracts/parsing/raw-parse-result.contract';
import { ParseExecutionContext } from '../engine/parse-execution-context';
import { DocumentProcessingProfile } from '@/core/contracts/classification/document-processing-profile.contract';
import { RawBlock } from '@/core/contracts/parsing/raw-parse-result.contract';
// WARNING:
// Parser MUST NOT infer semantic meaning.
// Parser outputs RAW blocks only.
export interface BaseCompute {
    readonly name: string;
    readonly version: string;
    readonly capability: ParserCapability;

    supports(profile: DocumentProcessingProfile): boolean;

    parseFromFile?(
        buffer: Buffer,
        ctx: ParseExecutionContext
    ): Promise<RawParseResult>;

    parseFromBlocks?(
        blocks: RawBlock[],
        ctx: ParseExecutionContext
    ): Promise<RawParseResult>;
}

