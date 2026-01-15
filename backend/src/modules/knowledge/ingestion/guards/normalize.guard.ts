import { IngestionExecution } from "../ingestion-execution";
import { GuardResult } from "./ingestion-result.guard";
import { RuntimeGuard } from "./runtime-guard.interface";

export class NormalizeGuard implements RuntimeGuard {
    readonly step = 'normalize';

    check(execution: IngestionExecution): GuardResult {
        if (!execution.runtime.parsing.CanonicalParsedDocument) {
            return {
                allowed: false,
                reason: 'Cannot normalize before parsing',
                severity: 'error',
            }
        }

        return { allowed: true};
    }
}