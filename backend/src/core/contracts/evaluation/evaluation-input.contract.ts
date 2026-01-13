import { RetrievalResult } from '../retrievals/retrieval-result.contract';
import { Answer } from '../prompt/answer.contract';

export interface EvaluationInput {
    query: string;

    retrieval: RetrievalResult;

    answer: Answer;

    groundTruth?: string; // optional – offline eval
}
