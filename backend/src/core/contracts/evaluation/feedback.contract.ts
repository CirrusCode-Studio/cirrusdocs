export interface Feedback {
    level: 'chunk' | 'retrieval' | 'prompt' | 'system';

    signal: string;

    suggestion?: string;

    metadata?: Record<string, any>;
}
