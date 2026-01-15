import { FusionContext } from "./fusion-context";

export interface FusionRule {
    readonly name: string;

    readonly blockType: string;

    readonly priority: number;

    supports(block: any, context: FusionContext): boolean;

    apply(blocks: any[], context: FusionContext): void;
}