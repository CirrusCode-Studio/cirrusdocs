import { IngestionExecution } from "../ingestion-execution";
import { GuardResult } from "./ingestion-result.guard";
import { RuntimeGuard } from "./runtime-guard.interface";

export class ValidateParsedOutputGuard implements RuntimeGuard {
    readonly step = 'validate';

    check(execution: IngestionExecution): GuardResult {
        if (!execution.runtime.parsing.CanonicalParsedDocument) {
            return {
                allowed: false,
                reason: 'CanonicalParsedDocument missing',
                severity: 'error',
            }
        }

        return { allowed: true };
    }
}