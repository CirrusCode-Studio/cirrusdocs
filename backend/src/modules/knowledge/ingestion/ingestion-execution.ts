import { IngestionContext } from "./ingestion-context";
import { IngestionRuntimeState } from "./runtime/ingestion-runtime-state";

export class IngestionExecution {
    readonly runtime : IngestionRuntimeState;

    constructor(
        readonly context: IngestionContext,
    ) {
        this.runtime = new IngestionRuntimeState();
    }
}