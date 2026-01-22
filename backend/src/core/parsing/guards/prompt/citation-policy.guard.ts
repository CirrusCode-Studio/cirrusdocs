import { Answer } from '@/core/parsing/contracts/prompts/answer.contract';

export class CitationPolicyGuard {
    static enforce(answer: Answer): void {
        if (answer.citations.length === 0) {
            throw new Error('Answer without citation is not allowed');
        }
    }
}
