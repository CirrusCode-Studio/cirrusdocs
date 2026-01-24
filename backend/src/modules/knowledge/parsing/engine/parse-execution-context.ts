import { PyComputeClient } from "../client/py-compute-client";
import { Logger } from "@nestjs/common";

export interface ParseExecutionContext {
    pyClient: PyComputeClient;
    logger?: Logger;

    traceId?: string;
}
