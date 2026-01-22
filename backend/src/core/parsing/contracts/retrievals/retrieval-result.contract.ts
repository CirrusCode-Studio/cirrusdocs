export interface RetrievalResult {
    query: string;

    selectedChunks: RetrievedChunk[];

    diagnostics: RetrievalDiagnostics;
}

export interface RetrievedChunk {
    chunkId: string;
    docId: string;

    text: string;

    score: number;

    source: {
        page?: number[];
        headingPath?: string[];
    };
}

export interface RetrievalDiagnostics {
    strategyUsed: string;

    candidatesCount: number;
    finalCount: number;

    rerankUsed: boolean;

    warnings?: string[];
}
