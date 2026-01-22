import { EvaluationMetric } from './evaluation-metric.contract';

export interface EvaluationResult {
    query: string;

    overallScore: number;

    metrics: EvaluationMetric[];

    passed: boolean;

    warnings?: string[];
}
