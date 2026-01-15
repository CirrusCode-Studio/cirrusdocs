import { FusionRule } from '../fusion-rule.interface';
import { FusionContext } from '../fusion-context';

export class TableFusionRule implements FusionRule {
    readonly name = 'table-rule';
    readonly blockType = 'table';
    readonly priority = 5;

    supports(block: any): boolean {
        return block.block_type === 'table';
    }

    apply(blocks: any[], context: FusionContext): void {
        const table = blocks[0];

        if (!table.content?.rows || !table.content?.headers) {
            context.warn(
                `Table ${table.block_id} incomplete`,
            );
        }
    }
}
