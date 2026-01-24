import { ParserContext } from "./parse-context";

export interface FallbackPolicy {
    shouldFallback(
        parserName: string,
        result: unknown,
        context: ParserContext
    ): boolean;
}