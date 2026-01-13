export interface IngestionResult {
    docId: string;
    pipeline: string;
    status: 'COMPLETED' | 'COMPLETED_WITH_WARNINGS' | 'FAILED';
    executedSteps: string[];
    warnings?: string[];
    error?: string;
}
