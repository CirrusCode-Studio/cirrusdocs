import { Block } from "@/core/contracts/parsing";

export interface NormalizedDocument {
    document_id: string;
    pages: NormalizedPage[];
    stats: NormalizeStats;
}

export interface NormalizedPage {
    page_number: number;
    blocks: NormalizedBlock[];
}

export interface NormalizedBlock extends Block {
    normalized: true;
}

export interface NormalizeStats {
    original_block_count: number;
    normalized_block_count: number;
    merged_blocks: number;
    removed_blocks: number;
}
