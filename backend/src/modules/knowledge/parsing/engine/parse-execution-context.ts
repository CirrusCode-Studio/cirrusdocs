import { Logger } from "@nestjs/common";
import { PyComputeClient } from "../client/py-compute-client";

export class ParseExecutionContext {
    constructor(
        readonly docId: string,
        readonly pyClient: PyComputeClient,
        readonly logger?: Logger,
    ) {}

    readonly signals: {
        ocrUsed?: boolean;
        fallbackTriggered?: boolean;
    } = {};

    readonly warnings?: string[] = [];
}