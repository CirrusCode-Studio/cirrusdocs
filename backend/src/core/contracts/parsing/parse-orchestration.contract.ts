import { RawBlock } from "@/modules/knowledge/parsing/raw/raw-block";
import { DocumentProcessingProfile } from "../classification/document-processing-profile.contract";

export interface ParseOrchestrationInput {
    docId: string;
    file: StoredDocumentRef;
    profile: DocumentProcessingProfile
}

export interface ParseOrchestraionResult {
    rawBlocks: RawBlock[];
    metadata: {
        profile: DocumentProcessingProfile;
        usedParsers: string[];
        fallbackTriggered: boolean;
        qualityWarnings: string[];
    }
}