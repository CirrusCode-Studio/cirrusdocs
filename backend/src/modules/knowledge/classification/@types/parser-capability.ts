export interface ParserCapability {
    modality: "text" | "table" | "layout" | "ocr" | "image";
    reliability: "primary" | "secondary" | "fallback";
    cost: "low" | "medium" | "high";
}