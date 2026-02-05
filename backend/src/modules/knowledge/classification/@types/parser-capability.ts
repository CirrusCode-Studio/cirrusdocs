export interface ParserCapability {
    modality: "text" | "table" | "layout" | "ocr" | "figure" | "formula" | "slide" | "audio" | "video" | "webpage" | "structured";
    reliability: "primary" | "secondary" | "fallback";
    cost: "low" | "medium" | "high";
}