import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import { ProfileOverride } from "../classification/overrides/profile-override.interface";

export interface IngestionContext {
    docId: string;

    fileRef: string; 

    profile: DocumentProcessingProfile;

    override?: ProfileOverride;

    mode: 'sync' | 'asycn' | 'background';

    metadata?: {
        requestedBy?: string;
        source?: 'api' | 'upload' | 'import';
    }
}