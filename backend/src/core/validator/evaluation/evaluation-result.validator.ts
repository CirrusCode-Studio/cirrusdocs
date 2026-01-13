import { EvaluationResult } from "@/core/contracts/evaluation/evaluation-result.contract";

export class EvaluationResultValidator {
    static validate(result: EvaluationResult): void {
        if (typeof result.overallScore !== 'number') {
            throw new Error('overallScore invalid');
        }

        if (!Array.isArray(result.metrics)) {
            throw new Error('metrics missing');
        }
    }
}
