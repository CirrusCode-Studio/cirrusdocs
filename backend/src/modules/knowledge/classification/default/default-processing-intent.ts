// classification/defaults/default-processing-intent.ts
import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";

export const DEFAULT_PROCESSING_INTENT: DocumentProcessingProfile["processing_intent"] = {
    requires_ocr: false,
    preserve_tables: true,
    prefer_layout: "linear",
    chunk_strategy_hint: "block",
};
