export interface RerankResult {
    chunkId: string;
    finalScore: number;

    signals: {
        vector: number;
        reranker?: number;
        heuristic?: number;
    };

    reasoning?: string;
}
