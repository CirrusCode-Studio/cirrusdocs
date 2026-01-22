import { EvaluationInput } from '../../contracts/evaluation/evaluation-input.contract';

export class EvaluationInputValidator {
    static validate(input: EvaluationInput): void {
        if (!input.query) throw new Error('query missing');
        if (!input.answer) throw new Error('answer missing');
        if (!input.retrieval) throw new Error('retrieval missing');
    }
}
