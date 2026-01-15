// ingestion-runtime.types.ts

export interface RuntimeSourceState {
    rawDocument?: unknown;
}

export interface RuntimeParsingState {
    CanonicalParsedDocument?: unknown;
}

export interface RuntimeClassificationState {
    documentProfile?: unknown;
}

export interface RuntimeChunkingState {
    chunks?: unknown[];
}

export interface RuntimeEmbeddingState {
    embeddings?: unknown[];
}

export interface RuntimeVectorStoreState {
    indexRef?: string;
}

export interface RuntimeAuditState {
    stepLogs: {
        step: string;
        timestamp: number;
        error?: string | undefined;
    }[];
}
