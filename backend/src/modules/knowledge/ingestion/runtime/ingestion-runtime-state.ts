// ingestion-runtime-state.ts

import {
    RuntimeSourceState,
    RuntimeParsingState,
    RuntimeClassificationState,
    RuntimeChunkingState,
    RuntimeEmbeddingState,
    RuntimeVectorStoreState,
    RuntimeAuditState,
} from './ingestion-runtime.types';

export class IngestionRuntimeState {
    readonly source: RuntimeSourceState = {};
    readonly parsing: RuntimeParsingState = {};
    readonly classification: RuntimeClassificationState = {};
    readonly chunking: RuntimeChunkingState = {};
    readonly embedding: RuntimeEmbeddingState = {};
    readonly vectorStore: RuntimeVectorStoreState = {};
    readonly audit: RuntimeAuditState = {
        stepLogs: [],
    };

    logStep(step: string): void {
        this.audit.stepLogs.push({
            step,
            timestamp: Date.now(),
        });
    }
}
