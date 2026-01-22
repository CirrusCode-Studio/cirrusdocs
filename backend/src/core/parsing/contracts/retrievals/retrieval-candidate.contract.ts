export interface RetrievalCandidate {
    chunkId: string;
    docId: string;

    text: string;

    score: {
        vectorScore: number;
        keywordScore?: number;
        sectionBoost?: number;
    };

    metadata: {
        headingPath?: string[];
        pageRange?: number[];
        source?: string;
    };
}
