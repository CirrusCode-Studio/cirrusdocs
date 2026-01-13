export interface DocumentChunk {
    chunkId: string;
    docId: string;

    index: number; // thứ tự chunk trong document

    content: string;

    metadata: {
        source: string;
        language: string;

        startOffset: number;
        endOffset: number;

        tokens?: number;
    };
}
