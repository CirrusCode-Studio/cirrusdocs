
export interface StoredDocumentRef {
    docId: string;

    mime: string;
    size?: number;

    getBuffer(): Promise<Buffer>;

    getStream?: NodeJS.ReadableStream;
}