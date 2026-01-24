export interface ParserCapability {
    modality: "text" | "table" | "layout" | "ocr" | "image" | "formula";
    reliability: "primary" | "secondary" | "fallback";
    cost: "low" | "medium" | "high";
}