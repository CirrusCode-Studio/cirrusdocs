import { IngestionExecution } from "../ingestion-execution";
import { GuardResult } from "./ingestion-result.guard";
import { RuntimeGuard } from "./runtime-guard.interface";

export class ValidateParsedOutputGuard implements RuntimeGuard {
    readonly step = 'validate';

    check(execution: IngestionExecution): GuardResult {
        if (!execution.runtime.parsing.parsedDocument) {
            return {
                allowed: false,
                reason: 'ParsedDocument missing',
                severity: 'error',
            }
        }

        return { allowed: true };
    }
}