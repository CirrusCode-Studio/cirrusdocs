import { QualityGate } from "./quality-gate.interface";
import { IngestionExecution } from "../ingestion-execution";
import { QualityGateResult } from "./quality-gate.interface";

export class EmbeddingQualityGate implements QualityGate {
    name = 'EMBEDDING_QUALITY';

    evaluate({ runtime }: IngestionExecution): QualityGateResult {
        const embeddings = runtime.embedding.embeddings ?? [];

        if (!embeddings.length) {
            return {
                pass: false,
                warnings: ['No embeddings produced'],
            };
        }

        const dimension = (embeddings[0] as any)?.vector?.length ?? 0;

        if (dimension < 128) {
            return {
                pass: false,
                warnings: ['Embedding dimension too small'],
                metrics: { dimension },
            };
        }

        return {
            pass: true,
            metrics: {
                embeddingCount: embeddings.length,
                dimension,
            },
        };
    }
}
