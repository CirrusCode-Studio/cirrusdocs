import { IngestionContext } from "@/modules/knowledge/ingestion/ingestion-context";

export interface StepHandler {
    /** Identification */
    readonly name: string;

    /** Execute step */
    execute(context: IngestionContext): Promise<void>;
}