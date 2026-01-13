import { GuardResult } from "./ingestion-result.guard";
import { RuntimeGuard } from "./runtime-guard.interface";

export class ParseGuard implements RuntimeGuard {
    readonly step = 'parse';

    check(): GuardResult {
        return { allowed: true };
    }
}