import { EvaluationInput } from "@/core/parsing/contracts/evaluation/evaluation-input.contract";

export class CitationFailureGuard {
    static enforce(input: EvaluationInput): void {
        if (input.answer.citations.length === 0) {
            throw new Error('Evaluation failed: no citations');
        }
    }
}
