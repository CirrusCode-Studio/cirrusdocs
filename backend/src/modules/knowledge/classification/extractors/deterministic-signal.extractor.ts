import { DocumentSignals } from '@/core/contracts/classification/document-signals.contract';

export class DeterministicSignalExtractor {
    extract(file): DocumentSignals['deterministic'] {
        return {
            mimeType: file.mimeType,
            fileExtension: file.extension,
            fileSizeMB: file.size / (1024 * 1024),
            pageCount: file.pageCount,
        };
    }
}
