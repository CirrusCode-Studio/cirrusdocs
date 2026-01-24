import { ParserCapability } from "../../classification/@types/parser-capability";
import { BaseParser } from "../parsers/base-parser.interface";
import { ParserContext } from "./parse-context";

export interface ParseStep {
    parser: BaseParser;
    capability: ParserCapability;
}

export class ParsePlanBuilder {
    constructor(
        private readonly parsers: BaseParser[]
    ){}

    build(context: ParserContext): ParseStep[] {
        return this.parsers
            .map(p => ({
                parser: p,
                capability: p.capability
            }))
            .filter(step => this.isCompatible(step.capability, context))
            .sort(this.rank);
    }

    private isCompatible(
        cap: ParserCapability,
        ctx: ParserContext
    ): boolean {
        if (cap.modality === 'ocr' && !ctx.signals.scanned) return false;
        return true;
    }

    private rank(a: ParseStep, b: ParseStep): number {
        const score = (c: ParserCapability) => {
            let s = 0;
            if (c.reliability === 'primary') s+=100;
            if (c.reliability === 'secondary') s+=50;
            if (c.cost === "low") s+=20;
            return s;
        };
        
        return score(b.capability) - score(a.capability);
    }
}