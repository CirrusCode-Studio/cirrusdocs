import {
    QualityGate,
    QualityGateResult,
} from './quality-gate-result.contract';
import { CanonicalParsedDocument } from '@/core/contracts/parsing';

export class MissingTableGate implements QualityGate {
    readonly name = 'missing-table';

    evaluate(doc: CanonicalParsedDocument): QualityGateResult {
        const expectedDensity =
            doc.document_metadata?.documentProfile?.table_density ?? 'none';

        // Không expect table → luôn PASS
        if (expectedDensity === 'none') {
            return {
                status: 'PASS',
                issues: [],
            };
        }

        const tableCount = doc.pages
            .flatMap(p => p.blocks)
            .filter(b => b.block_type === 'table')
            .length;

        // Mapping density → expectation
        const expectedMin =
            expectedDensity === 'high' ? 2 :
            expectedDensity === 'medium' ? 1 :
            0;

        if (tableCount === 0 && expectedMin > 0) {
            return {
                status: 'FAIL',
                issues: [
                    {
                        code: 'EXPECTED_TABLE_NOT_FOUND',
                        message: `Document profile expects tables (${expectedDensity}) but none were parsed`,
                        severity: 'error',
                    },
                ],
                metrics: {
                    expectedDensity:
                        expectedDensity === 'high' ? 1 :
                        expectedDensity === 'medium' ? 0.5 : 0,
                    detectedTables: 0,
                },
            };
        }

        if (tableCount < expectedMin) {
            return {
                status: 'PASS_WITH_WARNINGS',
                issues: [
                    {
                        code: 'LOW_TABLE_RECALL',
                        message: `Expected ~${expectedMin} table(s) based on profile, but found ${tableCount}`,
                        severity: 'warning',
                    },
                ],
                metrics: {
                    detectedTables: tableCount,
                },
            };
        }

        return {
            status: 'PASS',
            issues: [],
            metrics: {
                detectedTables: tableCount,
            },
        };
    }
}
