import { StepHandler } from "@/core/contracts/ingestion/step-handler.contract";

export class PipelineRegistry {
    private readonly handlers = new Map<string, StepHandler>();

    register(handler: StepHandler): void {
        if (this.handlers.has(handler.name)) {
            throw new Error(`Handler ${handler.name} already registered`);
        }
        this.handlers.set(handler.name, handler);
    }

    get(handlerName: string): StepHandler {
        const handler = this.handlers.get(handlerName);

        if (!handler) 
            throw new Error(`Handler ${handlerName} not found`)

        return handler;
    }

    has(handlerName: string): boolean {
        const result = this.handlers.get(handlerName); 
        return (result) ? true : false;
    }


}