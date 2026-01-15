import { RawBlock } from './raw-block';

export interface RawParseResult {
    engine: string;
    blocks: RawBlock[];
    ocr_used: boolean;
    errors?: string[];
}
