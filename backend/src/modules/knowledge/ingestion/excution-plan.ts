export type IngestionStepType = 
    | 'parse'
    | 'validate'
    | 'normalize'
    | 'chunk'
    | 'embed'
    | 'store';

export interface IngestionStep {
    step: IngestionStepType;

    handler: string;

    required: boolean;

    fallback?: string;
}

export interface ExecutionPlan {
    pipeline: string;

    steps: IngestionStep[];

    /** Error Policy */
    errorPolicy: {
        failFast: boolean;
        allowPartialSuccess: boolean;
    };
}
