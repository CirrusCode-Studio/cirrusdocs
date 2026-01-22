export type EvaluationMetricType =
  | 'faithfulness'
  | 'relevance'
  | 'completeness'
  | 'citation_accuracy'
  | 'latency'
  | 'cost';

export interface EvaluationMetric {
    type: EvaluationMetricType;
    score: number; // 0–1
    explanation?: string;
}
