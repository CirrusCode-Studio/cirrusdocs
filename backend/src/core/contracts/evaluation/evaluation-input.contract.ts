import { RetrievalResult } from '../retrievals/retrieval-result.contract';
import { Answer } from '../prompts/answer.contract';

export interface EvaluationInput {
    query: string;

    retrieval: RetrievalResult;

    answer: Answer;

    groundTruth?: string; // optional – offline eval
}
