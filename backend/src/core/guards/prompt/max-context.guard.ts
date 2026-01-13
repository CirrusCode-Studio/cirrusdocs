import { PromptContext } from "@/core/contracts/prompt/prompt-context.contract";

export class MaxContextGuard {
    static enforce(ctx: PromptContext, maxChunks = 8): void {
        if (ctx.chunks.length > maxChunks) {
            ctx.chunks = ctx.chunks.slice(0, maxChunks);
        }
    }
}
