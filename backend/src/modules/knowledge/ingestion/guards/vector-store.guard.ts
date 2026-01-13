import { RuntimeGuard } from "./runtime-guard.interface";
import { IngestionExecution } from "../ingestion-execution";
import { GuardResult } from "./ingestion-result.guard";

export class VectorStoreGuard implements RuntimeGuard {
    readonly step = 'store';

    check(execution: IngestionExecution): GuardResult {
        const embeddings = execution.runtime.embedding.embeddings;

        if (!embeddings || embeddings.length === 0) {
            return {
                allowed: false,
                reason: 'No embeddings available',
                severity: 'error',
            };
        }

        return { allowed: true };
    }
}
