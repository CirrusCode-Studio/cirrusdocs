import { FusionRule } from '../fusion-rule.interface';
import { FusionContext } from '../fusion-context';

export class HeadingFusionRule implements FusionRule {
    readonly name = 'heading-rule';
    readonly blockType = 'heading';
    readonly priority = 10;

    supports(block: any): boolean {
        return block.block_type === 'heading';
    }

    apply(blocks: any[], context: FusionContext): void {
        const block = blocks[0];

        if (!block.logical?.heading_level) {
            context.warn(
                `Heading ${block.block_id} missing level`,
            );
            block.logical.heading_level = undefined;
        }
    }
}
