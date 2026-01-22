import { DocumentSignals } from '@/core/parsing/contracts/classification/document-signals.contract';

export interface DocumentDetector {
    supports(mimeType: string, extension: string): boolean;
    detect(file: Buffer): Promise<{
        mimeType: string;
        extension: string;
        fileSizeMB: number;
        pageCount?: number;
    }>;
}
