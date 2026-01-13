import { IngestionExecution } from "../ingestion-execution";
import { GuardResult } from "./ingestion-result.guard";

export interface RuntimeGuard {
    readonly step: string;
    check(execution: IngestionExecution): GuardResult;
}