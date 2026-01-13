import { PromptContext } from '@/core/contracts/prompt/prompt-context.contract';

export class PromptContextValidator {
    static validate(ctx: PromptContext): void {
        if (!ctx.query) throw new Error('query missing');

        if (!ctx.chunks?.length) {
            throw new Error('No retrieval chunks provided');
        }

        for (const c of ctx.chunks) {
            if (!c.text || !c.chunkId) {
                throw new Error('Invalid RetrievedChunk');
            }
        }
    }
}
