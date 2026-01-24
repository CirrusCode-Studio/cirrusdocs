import { ParseInput } from "../engine/parse-engine";

export interface ParserContext {
    input: ParseInput;

    detectedMime: string;
    confidence: number;

    signals: {
        hasText?: boolean;
        hasTables?: boolean;
        hasImage?: boolean;
        scanned?: boolean;
    };

    results: Map<string, unknown>;
}