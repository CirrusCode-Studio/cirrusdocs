import { StructuralStrategyRegistry } from "./structural/strategy-registry";

export class StructuralSignalExtractor {
    constructor(
        private readonly registry: StructuralStrategyRegistry
    ){}

    extract(
        file: Buffer,
        meta: {
            mimeType: string;
            extendsion: string;
            pageCount: number;
        }
    ) {
        const strategy = 
            this.registry.resolve(meta.mimeType, meta.extendsion);
            
            return strategy.extract(file, meta);
    }
}
