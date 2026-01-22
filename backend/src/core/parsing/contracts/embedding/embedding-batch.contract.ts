export interface EmbeddingBatchResult {
    jobId: string;

    model: {
        name: string;
        version?: string;
        dimensions: number;
    };

    stats: {
        totalChunks: number;
        embedded: number;
        failed: number;
        durationMs: number;
    };

    diagnostics: {
        warnings: string[];
        errors: string[];
    };
}
