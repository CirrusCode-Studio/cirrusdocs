import { IngestionExecution } from "@/modules/knowledge/ingestion/ingestion-execution";

export interface StepHandler {
    /** Identification */
    readonly name: string;

    /** Execute step */
    execute(context: IngestionExecution): Promise<void>;
}