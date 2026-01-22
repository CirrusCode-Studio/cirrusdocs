import { RetrievedChunk } from "../retrievals/retrieval-result.contract";

export interface PromptContext {
    query: string;

    chunks: RetrievedChunk[];

    systemRules?: string[];

    constraints?: {
        maxTokens?: number;
        answerStyle?: 'concise' | 'detailed' | 'step_by_step';
        language?: string;
    };
}
