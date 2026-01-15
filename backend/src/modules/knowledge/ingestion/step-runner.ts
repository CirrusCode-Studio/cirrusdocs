import { GuardRegistry } from "./guards/guard-registry";
import { IngestionExecution } from "./ingestion-execution";
import { PipelineRegistry } from "./pipeline-registry";

export class StepRunner {
    constructor(
        private readonly registry: PipelineRegistry,
        private readonly guardRegistry: GuardRegistry,
    ){}

    async run(
        handlerName: string,
        execution: IngestionExecution,
    ): Promise<void> {
        const handler = this.registry.get(handlerName);
        const guards = this.guardRegistry.get(handlerName);

        for (const guard of guards) {
            const result = guard.check(execution);

            if (!result.allowed) {
                execution.runtime.audit.stepLogs.push({
                    step: handlerName,
                    timestamp: Date.now(),
                    error: result.reason,
                });

                if (result.severity === 'error') {
                    throw new Error(result.reason);
                }

                return;
            }
        }
        await handler.execute(execution);
        
        if (handler.qualityGate) {
            const result = handler.qualityGate.evaluate(execution);

            execution.runtime.audit.stepLogs.push({
                step: `${handlerName}:quality`,
                timestamp: Date.now(),
                ...(result.metrics && { metrics: result.metrics }),
            })

            if (!result.pass) {
                throw new Error(
                    `QualityGateFailed: ${handler.qualityGate.name} – ${
                        result.warnings?.join(', ') ?? ''
                    }`,
            );
        }
        }
        execution.runtime.logStep(handlerName);
    }
}