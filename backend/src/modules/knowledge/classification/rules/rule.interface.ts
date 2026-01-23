import { DocumentSignals } from "@/core/contracts/classification/document-signals.contract";
import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";

export interface ClassificationRule {
    /** Unique identifier */
    name: string;

    /** Relative importance when conflicts occur */
    weight: number;

    /** Whether this rule applies based on signals */
    match(signals: DocumentSignals): boolean;

    /** 
     * Apply partial modifications to profile.
     * MUST be pure & idempotent.
     */
    apply(
        current: Partial<DocumentProcessingProfile>,
        signals: DocumentSignals
    ): Partial<DocumentProcessingProfile>;
}
