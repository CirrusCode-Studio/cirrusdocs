export interface EngineParseOuput {
    engine: string;
    blocks: any[];
    confidence?: number;
}

export interface FusionInput {
    docId: string;
    pageCount: number;
    outputs: EngineParseOuput[];
}