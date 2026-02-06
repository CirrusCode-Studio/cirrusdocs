import { DocumentProcessingProfile } from "../classification/document-processing-profile.contract";
import { RawBlock } from "./raw-parse-result.contract";
import { StoredDocumentRef } from "../storage/stored-document-ref.contract";

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
        fallbackTriggered?: boolean;
        qualityWarnings?: string[];
    }
}