import { IngestionContext } from "./ingestion-context";
import { IngestionExecution } from "./ingestion-execution";
import { PipelineRegistry } from "./pipeline-registry";

export class StepRunner {
    constructor(private readonly registry: PipelineRegistry){}

    async run(
        handlerName: string,
        execution: IngestionExecution,
    ): Promise<void> {
        const handler = this.registry.get(handlerName);
        await handler.execute(execution);
    }
}