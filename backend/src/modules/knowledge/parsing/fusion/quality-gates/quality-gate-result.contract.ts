import { CanonicalParsedDocument } from "@/core/contracts/parsing";

export type QualityGateStatus =
  | 'PASS'
  | 'PASS_WITH_WARNINGS'
  | 'FAIL';

export interface QualityGateIssue {
    code: string;
    message: string;
    blockId?: string;
    severity: 'warning' | 'error';
}

export interface QualityGateResult {
    status: QualityGateStatus;
    issues: QualityGateIssue[];
    metrics?: Record<string, number>;
}

export interface QualityGate {
  readonly name: string;
  evaluate(parsed: CanonicalParsedDocument): QualityGateResult;
}
