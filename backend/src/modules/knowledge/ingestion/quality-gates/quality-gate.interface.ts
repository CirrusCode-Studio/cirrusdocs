import { IngestionExecution } from "../ingestion-execution";

export interface QualityGateResult {
    pass: boolean;
    warnings?: string[];
    metrics?: Record<string, number>;
}

export interface QualityGate {
    readonly name: string;
    
    evaluate(execution: IngestionExecution) : QualityGateResult;
}