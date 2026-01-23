import { FusionContext } from "../fusion-context";
import { FusionRule } from "../fusion-rule.interface";

export class FormulaFusionRule implements FusionRule {
    readonly name = 'formula-rule';
    readonly blockType = 'formula';
    readonly priority = 5;

    supports(block: any): boolean {
        return block.block_type === 'figure';
    }

    apply(blocks: any[], context: FusionContext): void {
        const formula = blocks[0];

        if (!formula.content?.latex && !formula.content?.mathml) {
            context.warn(
                `Formula ${formula.block_id} fallback to text`,
            );
        }
    }
}
