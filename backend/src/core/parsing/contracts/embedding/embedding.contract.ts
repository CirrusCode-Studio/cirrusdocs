export interface EmbeddingVector {
    embeddingId: string;

    docId: string;
    chunkId: string;

    vector: number[];

    metadata: {
        model: string;
        modelVersion?: string;

        dimensions: number;
        createdAt: string;

        source: string;
        language: string;
    };
}
