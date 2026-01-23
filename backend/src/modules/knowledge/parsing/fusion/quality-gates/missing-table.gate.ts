import { QualityGate, QualityGateIssue, QualityGateResult } from './quality-gate-result.contract';
import { CanonicalParsedDocument } from '@/core/contracts/parsing';

export class MissingTableGate implements QualityGate {
    readonly name = 'missing-table';

    evaluate(doc: CanonicalParsedDocument): QualityGateResult {
        const issues: QualityGateIssue[] = [];

        const expectedTableDensity =
        doc.document_metadata?.documentProfile?.table_density;

        const hasTableBlock = doc.blocks.some(
            b => b.block_type === 'table',
        );

        // Only trigger if profile EXPECTS tables
        if (
        (expectedTableDensity === 'medium' ||
            expectedTableDensity === 'high') &&
        !hasTableBlock
        ) {
        issues.push({
            code: 'EXPECTED_TABLE_NOT_FOUND',
            message:
            'Document profile indicates table presence, but no table blocks were parsed',
            severity: 'error',
        });

        return {
            status: 'FAIL',
            issues,
            metrics: {
                expectedTableDensity:
                    expectedTableDensity === 'high' ? 1 : 0.5,
                detectedTables: 0,
            },
        };
        }

        return {
            status: 'PASS',
            issues: [],
        };
    }
}
