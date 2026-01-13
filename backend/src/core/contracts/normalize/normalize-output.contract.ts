export interface NormalizedDocument {
    docId: string;
    source: string;
    language: string;
    cleanText: string;
    stats?: {
        originalLength: number;
        cleanedLength: number;
    };
}