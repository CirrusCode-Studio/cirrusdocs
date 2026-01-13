import { Answer } from '@/core/contracts/prompt/answer.contract';

export class AnswerValidator {
    static validate(answer: Answer): void {
        if (!answer.answerText) {
            throw new Error('Answer text missing');
        }

        if (!answer.citations?.length) {
            throw new Error('Answer must contain citations');
        }
    }
}
