export class DeterministicSignalExtractor {
    extract(meta: {
        mimeType: string;
        extension: string;
        fileSizeMB: number;
        pageCount?: number;
    }) {
        return {
            mimeType: meta.mimeType,
            fileExtension: meta.extension,
            fileSizeMB: meta.fileSizeMB,
            pageCount: meta.pageCount ?? 0, // normalize
        };
    }
}
