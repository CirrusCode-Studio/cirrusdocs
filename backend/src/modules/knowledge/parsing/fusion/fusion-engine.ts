import { FusionRuleRegistry } from './fusion-rule-registry';
import { FusionBlock, FusionDocument } from './fusion-input.contract';
import { Block } from '@/core/contracts/parsing';
import { FusionContext } from './fusion-context';

export class FusionEngine {
    constructor(
        private readonly registry: FusionRuleRegistry
    ){}

    fuse(input: FusionDocument): Block[] {
        const blocks: Block[] = [];
        const ctx = new FusionContext(input, null as any);
        
        const rules = this.registry.getRules();
        for (const fusionBlock of input.pages.flatMap(p => p.blocks)) {
            for (const rule of rules) {
                if (rule.supports(fusionBlock, ctx)) {
                    const block = rule.apply([fusionBlock], ctx, blocks.length);
                    blocks.push(block);
                    break;
                }
            }
        }

        return blocks;
    }
}
