import { EvaluationInput } from './evaluation-input.contract';
import { EvaluationResult } from './evaluation-result.contract';
import { Feedback } from './feedback.contract';

export interface EvaluationEngine {
    evaluate(input: EvaluationInput): Promise<{
        result: EvaluationResult;
        feedback?: Feedback[];
    }>;
}
