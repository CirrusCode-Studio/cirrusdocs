// src/modules/knowledge/parsing/engine/parse-engine.ts
import { ParseOrchestrator } from "./parse-orchestrator";
import { FusionEngine } from "../fusion/fusion-engine";
import { CanonicalParsedDocument } from "@/core/contracts/parsing";
import { NormalizeService } from "../normalization/normalize.service";

export interface ParseInput {
    buffer: Buffer;
    mime: string;
}

export class ParseEngine {
    constructor(
        private readonly orchestrator: ParseOrchestrator,
        private readonly fusion: FusionEngine,
        private readonly normalizer: NormalizeService,
    ) {}

    async parse(input: ParseInput): Promise<CanonicalParsedDocument> {
        const rawResults = await this.orchestrator.run(input);

        const canonicalDoc = this.fusion.fuse(rawResults);

        const normalizeDoc = this.normalizer.normalize(canonicalDoc);

        return normalizeDoc;
    }
}
