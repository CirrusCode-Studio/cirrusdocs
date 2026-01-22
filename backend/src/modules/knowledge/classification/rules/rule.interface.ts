import { DocumentProcessingProfile } from "@/core/parsing/contracts/classification/document-processing-profile.contract";
import { DocumentSignals } from "@/core/parsing/contracts/classification/document-signals.contract";

export interface ClassificationRule {
    name: string;
    weight: number;

    match(signals: DocumentSignals): boolean;

    apply(
        partial: Partial<DocumentProcessingProfile>
    ): Partial<DocumentProcessingProfile>
}