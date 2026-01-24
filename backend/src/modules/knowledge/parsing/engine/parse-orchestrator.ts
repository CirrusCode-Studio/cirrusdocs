// src/modules/knowledge/parsing/engine/parse-orchestrator.ts

import { FallbackPolicy } from "../orchestration/fallback-policy";
import { ParserSelector } from "../orchestration/parser-selector";
import { ParseEngine } from "./parse-engine";
import { ParseOrchestraionResult, ParseOrchestrationInput } from "@/core/contracts/parsing/parse-orchestration.contract";
export class ParseOrchestrator {
    constructor(
        private readonly selector: ParserSelector,
        private readonly engine: ParseEngine,
        private readonly fallbackPolicy: FallbackPolicy
    ){}

    async orchestrate(input: ParseOrchestrationInput) {
        const plant = this.selector.buildPlan(input.profile);

        let result = await this.engine.execute(plan, input.file)
        
        if (!this.engine.passQuality(plan, result)) {
            const fallback = this.fallbackPolicy.resolve(plan);
            result = await this.engine.execute(fallback, input.file);
        }

        return result;
    }
}
