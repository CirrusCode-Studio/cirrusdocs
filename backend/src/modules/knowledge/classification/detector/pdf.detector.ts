import * as pdfjs from 'pdfjs-dist';
import { DocumentDetector } from './document-detactor.interface';

export class PDFDetector implements DocumentDetector {

    supports(mimeType: string, extension: string): boolean {
        return mimeType === 'application/pdf' || extension === '.pdf';
    }

    async detect(file: Buffer): Promise<{
        mimeType: string;
        extension: string;
        fileSizeMB: number;
        pageCount?: number;
    }> {
        let pageCount: number | undefined;

        try {
            const loadingTask = pdfjs.getDocument({ data: file });
            const pdf = await loadingTask.promise;
            pageCount = pdf.numPages;
        } catch (err) {
            /**
             * IMPORTANT:
             * - Detector không throw trừ khi file không đọc được hoàn toàn
             * - pageCount undefined => downstream biết là "metadata unreliable"
             */
            pageCount = undefined;
        }

        return {
            mimeType: 'application/pdf',
            extension: '.pdf',
            fileSizeMB: Number((file.length / 1024 / 1024).toFixed(2)),
            pageCount,
        };
    }
}
