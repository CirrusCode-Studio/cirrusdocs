import { FusionRule } from '../fusion-rule.interface';
import { FusionContext } from '../fusion-context';

export class UnknownFusionRule implements FusionRule {
    readonly name = 'unknown-rule';
    readonly blockType = 'unknown';
    readonly priority = 1000;

    supports(block: any): boolean {
        return !block.block_type || block.block_type === 'unknown';
    }

    apply(blocks: any[], context: FusionContext): void {
        const block = blocks[0];

        context.warn(
            `Unknown block ${block.block_id} preserved as-is`,
        );

        block.flags = {
            ...(block.flags ?? {}),
            unknown: true,
        };

        block.content = {
            raw: block.content ?? block.raw ?? null,
        };
    }
}
