import { IngestionExecution } from "../ingestion-execution";
import { GuardResult } from "./ingestion-result.guard";
import { RuntimeGuard } from "./runtime-guard.interface";

export class ChunkGuard implements RuntimeGuard {
    readonly step = 'chunk';

    check(execution: IngestionExecution): GuardResult {
        const doc = execution.runtime.parsing.CanonicalParsedDocument;

        if (!doc) {
            return {
                allowed: false,
                reason: 'CanonicalParsedDocument mssing',
                severity: 'error',
            }
        }

        if (!doc.pages?.length) {
            return {
                allowed: false,
                reason: 'Document has no pages',
                severity: 'warning',
            };
        }

        return { allowed: true};
    }
}