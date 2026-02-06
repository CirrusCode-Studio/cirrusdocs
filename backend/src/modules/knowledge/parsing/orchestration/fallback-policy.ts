import { BaseCompute } from "../compute/base-compute.interface";
import { RawParseResult } from "@/core/contracts/parsing/raw-parse-result.contract";

export interface FallbackPolicy {
    shouldFallback(
        compute: BaseCompute,
        error?: Error | null,
        result?: RawParseResult | null
    ): boolean;
}