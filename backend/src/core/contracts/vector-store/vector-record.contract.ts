export interface VectorRecord {
    id: string;               // usually = embeddingId
    vector: number[];

    payload: {
        docId: string;
        chunkId: string;

        source?: string;
        language?: string;

        tags?: string[];
    };
}
