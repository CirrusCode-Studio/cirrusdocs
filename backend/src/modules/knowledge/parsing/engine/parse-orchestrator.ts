// src/modules/knowledge/parsing/engine/parse-orchestrator.ts
import { Logger } from "@nestjs/common";
import { ParserSelector } from "../orchestration/parser-selector";
import { FallbackPolicy } from "../orchestration/fallback-policy";
import { ParseExecutionContext } from "./parse-execution-context";
import {
    ParseOrchestrationInput,
    ParseOrchestraionResult,
} from "@/core/contracts/parsing/parse-orchestration.contract";
import { RawBlock } from "@/core/contracts/parsing/raw-parse-result.contract";
import { RawParseResult } from "@/core/contracts/parsing/raw-parse-result.contract";
import { PyComputeClient } from "../client/py-compute-client";

export class ParseOrchestrator {
    constructor(
        private readonly selector: ParserSelector,
        private readonly fallbackPolicy: FallbackPolicy,
        private readonly pyClient: PyComputeClient,
        private readonly logger?: Logger,
    ) {}

    async run(
        input: ParseOrchestrationInput
    ): Promise<ParseOrchestraionResult> {

        const plan = this.selector.select(input.profile);

        const ctx = new ParseExecutionContext(
            input.docId,
            this.pyClient,
            this.logger,
        );

        const buffer = await input.file.getBuffer();

        let currentBlocks: RawBlock[] = [];
        const usedParsers: string[] = [];

        for (const step of plan.steps) {
            if (!step.enabled) continue;

            let result: RawParseResult | null = null;
            let error: Error | null = null;

            try {
                if (step.inputType === 'file') {
                    if (!step.compute.parseFromFile) {
                        throw new Error(
                            `[${step.compute.name}] does not support file input`
                        );
                    }

                    result = await step.compute.parseFromFile(
                        buffer,
                        ctx,
                    );
                }

                if (step.inputType === 'blocks') {
                    if (!step.compute.parseFromBlocks) {
                        throw new Error(
                            `[${step.compute.name}] does not support block input`
                        );
                    }

                    result = await step.compute.parseFromBlocks(
                        currentBlocks,
                        ctx,
                    );
                }

                if (!result) {
                    throw new Error(
                        `[${step.compute.name}] returned empty parse result`
                    );
                }

                usedParsers.push(step.compute.name);
                currentBlocks.push(...result.blocks);

            } catch (e) {
                error = e as Error;
                this.logger?.error(
                    `[PARSE][${step.compute.name}] failed`,
                    error.stack,
                );
            }

            if (
                this.fallbackPolicy.shouldFallback(
                    step.compute,
                    error,
                    result,
                )
            ) {
                ctx.signals.fallbackTriggered = true;

                if (!plan.fallback) break;

                return this.run({
                    docId: input.docId,
                    file: input.file,
                    profile: plan.fallback.profile,
                });
            }
        }

        return {
            rawBlocks: currentBlocks,
            metadata: {
                profile: input.profile,
                usedParsers,
                fallbackTriggered: ctx.signals.fallbackTriggered,
                qualityWarnings: ctx.warnings,
            },
        };
    }
}