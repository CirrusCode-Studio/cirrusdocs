// src/modules/knowledge/parsing/engine/parse-engine.ts
import { ParseOrchestrator } from "./parse-orchestrator";
import { FusionEngine } from "../fusion/fusion-engine";
import { CanonicalParsedDocument } from "@/core/contracts/parsing";
import { NormalizeService } from "../normalization/normalize.service";
import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";

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

    async execute(
        input: ParseInput,
        profile: DocumentProcessingProfile
    ): Promise<CanonicalParsedDocument> {
        const rawResults = await this.orchestrator.run({
            input, 
            profile
        });

        const fused = this.fusion.fuse(rawResults);
        
        return this.normalizer.normalize(fused);
    }
}
