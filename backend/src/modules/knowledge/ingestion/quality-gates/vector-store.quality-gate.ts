import { QualityGate } from "./quality-gate.interface";
import { IngestionExecution } from "../ingestion-execution";
import { QualityGateResult } from "./quality-gate.interface";

export class VectorStoreQualityGate implements QualityGate {
    name = 'VECTOR_STORE_QUALITY';

    evaluate({ runtime }: IngestionExecution): QualityGateResult {
        if (!runtime.vectorStore.indexRef) {
            return {
                pass: false,
                warnings: ['Vector index reference missing'],
            };
        }

        return {
            pass: true,
        };
    }
}
