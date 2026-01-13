import { IngestionResult } from "@/core/contracts/ingestion/ingestion-result.contract";
import { IngestionContext } from "./ingestion-context";
import { ExecutionPlan } from "./excution-plan";

export class IngestionOrchestrator {
    async ingest(context: IngestionContext): Promise<IngestionResult> {
        const plan = this.buildExecutionPlan(context);

        const executedSteps: string[] = [];
        const warnings: string[] = [];

        for (const step of plan.steps) {
            try {
                await this.executeStep(step.handler, context);

                executedSteps.push(step.step);
            } catch (err) {
                if (step.fallback) {
                    warnings.push(
                        `Step ${step.step} failed. Fallback to ${step.fallback}`,
                    );

                    await this.executeStep(step.fallback, context);
                    executedSteps.push(`${step.step}:fallback`);
                } else if (step.required && plan.errorPolicy.failFast) {
                    return {
                        docId: context.docId,
                        pipeline: plan.pipeline,
                        status: 'FAILED',
                        executedSteps,
                        error: String(err),
                    }
                }
            }
        }

        return {
            docId: context.docId,
            pipeline: plan.pipeline,
            status: warnings.length 
                ? 'COMPLETED_WITH_WARNINGS'
                : 'COMPLETED',
                executedSteps,
                warnings,
        };
    }

    private buildExecutionPlan(context: IngestionContext): ExecutionPlan {
        const profile = context.profile;
        
        const pipeline = 
            context.override?.force_pipeline ?? 
            profile.preferred_pipeline;

        return {
            pipeline,
            steps: [
                {
                    step: 'parse',
                    handler: 'PARSER_PRIMARY',
                    fallback: 'PARSER_FALLBACK',
                    required: true,
                },
                {
                    step: 'validate',
                    handler: 'PARSED_OUTPUT_VALIDATOR',
                    required: true,
                },
                {
                    step: 'normalize',
                    handler: 'NORMALIZE_PIPELINE',
                    required: true,
                },
                {
                    step: 'chunk',
                    handler: 'CHUNK_STRATEGY_DEFAULT',
                    required: true,
                },
                {
                    step: 'embed',
                    handler: 'EMBEDDING_DEFAULT',
                    required: true,
                },
                {
                    step: 'store',
                    handler: 'VECTOR_STORE_DEFAULT',
                    required: true,
                },
            ],
            errorPolicy: {
                failFast: false,
                allowPartialSuccess: true,
            },
        }
    }

    private async executeStep(
        handler: string,
        context: IngestionContext,
    ): Promise<void> {
        // Placeholder
        // Sau này map handler -> concrete implementation
        return;
    }
}