import { QualityGate } from "./quality-gate.interface";
import { IngestionExecution } from "../ingestion-execution";
import { QualityGateResult } from "./quality-gate.interface";

export class ChunkingQualityGate implements QualityGate {
    name = 'CHUNKING_QUALITY';

    evaluate({ runtime }: IngestionExecution): QualityGateResult {
        const chunks = runtime.chunking.chunks ?? [];

        const avgSize =
            chunks.reduce((s, c: any) => s + (c.text?.length ?? 0), 0) /
            Math.max(chunks.length, 1);

        if (chunks.length < 3) {
            return {
                pass: false,
                warnings: ['Too few chunks generated'],
                metrics: { chunkCount: chunks.length },
            };
        }

        return {
            pass: true,
            metrics: {
                chunkCount: chunks.length,
                avgChunkSize: avgSize,
            },
        };
    }
}
