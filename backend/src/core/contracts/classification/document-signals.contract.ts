export interface DocumentSignals {
    deterministic: {
        mimeType: string;
        fileExtension: string;
        fileSizeMB: number;
        pageCount: number;
    };

    structural: {
        avgTextPerPage: number;
        imageOnlyPageRatio: number;
        headingCount: number;
        tableCount: number;
        fontVariance: number;
    };

    llm?: {
        suggested_category?: string;
        explanation?: string;
    };
}
