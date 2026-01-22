import { PromptContext } from "@/core/parsing/contracts/prompts/prompt-context.contract";

export class MaxContextGuard {
    static enforce(ctx: PromptContext, maxChunks = 8): void {
        if (ctx.chunks.length > maxChunks) {
            ctx.chunks = ctx.chunks.slice(0, maxChunks);
        }
    }
}
