import { RawBlock } from './raw-block';

export interface RawParseResult {
    engines_used: {
    name: string;
    version?: string;
    vendor?: 'python' | 'native' | 'external';
    }[];

    
    blocks: RawBlock[];
    ocr_used: boolean;
    errors?: string[];
}
