import { Block } from "@/core/contracts/parsing";
import { FusionContext } from "./fusion-context";
import { FusionBlock } from "./fusion-input.contract";

export interface FusionRule {
    readonly name: string;

    readonly blockType: string;

    readonly priority: number;

    supports(block: any, context: FusionContext): boolean;

    apply(blocks: FusionBlock[], context: FusionContext, length: number): Block;
}