import { IngestionExecution } from "@/modules/knowledge/ingestion/ingestion-execution";
import { QualityGate } from "@/modules/knowledge/ingestion/quality-gates/quality-gate.interface";

export interface StepHandler {
    /** Identification */
    readonly name: string;

    /** Execute step */
    execute(context: IngestionExecution): Promise<void>;

    qualityGate?: QualityGate;
}