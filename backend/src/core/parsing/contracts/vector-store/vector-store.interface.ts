import { VectorRecord } from "./vector-record.contract";
import { VectorSearchResult } from "./vector-search-result.contract";

export interface VectorStore {
    upsert(vectors: VectorRecord[]): Promise<void>;

    deleteByDocId(docId: string): Promise<void>;

    similaritySearch(
        queryVector: number[],
        topK: number,
        filters?: Record<string, any>,
    ): Promise<VectorSearchResult[]>;
}
