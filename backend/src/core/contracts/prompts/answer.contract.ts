import { Citation } from './citation.contract';

export interface Answer {
    answerText: string;

    citations: Citation[];

    confidence?: number;

    reasoning?: string;
}
