import { QualityGate, QualityGateResult } from './quality-gate-result.contract';
import { CanonicalParsedDocument } from '@/core/contracts/parsed-output';

export class TooManyUnknownGate implements QualityGate {
    readonly name = 'too-many-unknown';

    private readonly WARN_THRESHOLD = 0.15;
    private readonly FAIL_THRESHOLD = 0.3;

    evaluate(doc: CanonicalParsedDocument): QualityGateResult {
        let totalBlocks = 0;
        let unknownBlocks = 0;

        for (const page of doc.pages) {
        for (const block of page.blocks) {
            totalBlocks++;

            if (block.block_type === 'unknown') {
            unknownBlocks++;
            }
        }
        }

        if (totalBlocks === 0) {
        return {
            status: 'FAIL',
            issues: [
            {
                code: 'NO_BLOCKS',
                message: 'Document contains no blocks to evaluate',
                severity: 'error',
            },
            ],
        };
        }

        const ratio = unknownBlocks / totalBlocks;

        if (ratio >= this.FAIL_THRESHOLD) {
        return {
            status: 'FAIL',
            issues: [
            {
                code: 'TOO_MANY_UNKNOWN_BLOCKS',
                message: `Unknown block ratio too high (${Math.round(
                ratio * 100,
                )}%)`,
                severity: 'error',
            },
            ],
            metrics: {
                totalBlocks,
                unknownBlocks,
                unknownRatio: ratio,
            },
        };
        }

        if (ratio >= this.WARN_THRESHOLD) {
        return {
            status: 'PASS_WITH_WARNINGS',
            issues: [
                {
                    code: 'HIGH_UNKNOWN_BLOCK_RATIO',
                    message: `High unknown block ratio (${Math.round(
                    ratio * 100,
                    )}%)`,
                    severity: 'warning',
                },
            ],
            metrics: {
                totalBlocks,
                unknownBlocks,
                unknownRatio: ratio,
            },
        };
        }

        return {
            status: 'PASS',
            issues: [],
            metrics: {
                totalBlocks,
                unknownBlocks,
                unknownRatio: ratio,
            },
        };
    }
}
