import { IngestionExecution } from "../ingestion-execution";
import { GuardResult } from "./ingestion-result.guard";
import { RuntimeGuard } from "./runtime-guard.interface";

export class EmbeddingGuard implements RuntimeGuard {
    readonly step = 'embed';

    check(execution: IngestionExecution): GuardResult {
        const chunks = execution.runtime.chunking.chunks;

        if (!chunks || chunks.length === 0) {
            return {
                allowed: false,
                reason: 'No chunks to embed',
                severity: 'error',
            }
        }

        return { allowed: true };
    }
}