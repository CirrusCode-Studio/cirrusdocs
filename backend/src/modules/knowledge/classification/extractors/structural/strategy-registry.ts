import { StructuralStrategy } from "./structural-strategy.interface";

export class StructuralStrategyRegistry {
    constructor(
        private readonly strategies: StructuralStrategy[]
    ){}

    resolve(mimeType: string, extension: string): StructuralStrategy {
        const strategy = this.strategies.find(s => 
            s.supports(mimeType, extension)
        );

        if (!strategy) {
            throw new Error(
                `No structural strategy for ${mimeType} ${extension}`
            );
        }

        return strategy;
    }
}