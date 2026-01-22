export interface VectorSearchResult {
    id: string;              // embeddingId
    score: number;           // similarity score

    payload: {
        docId: string;
        chunkId: string;
    };
}
