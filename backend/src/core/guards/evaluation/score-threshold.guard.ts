import { EvaluationResult } from "@/core/contracts/evaluation/evaluation-result.contract";

export class ScoreThresholdGuard {
    static enforce(result: EvaluationResult, minScore = 0.6): void {
        if (result.overallScore < minScore) {
            result.passed = false;
        }
    }
}
