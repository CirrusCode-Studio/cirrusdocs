export interface Citation {
    chunkId: string;
    docId: string;

    page?: number[];
    headingPath?: string[];

    quote?: string;
}
