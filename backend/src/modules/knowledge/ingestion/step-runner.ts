import { IngestionContext } from "./ingestion-context";
import { PipelineRegistry } from "./pipeline-registry";

export class StepRunner {
    constructor(private readonly registry: PipelineRegistry){}

    async run(
        handlerName: string,
        context: IngestionContext,
    ): Promise<void> {
        const handler = this.registry.get(handlerName);
        await handler.execute(context);
    }
}