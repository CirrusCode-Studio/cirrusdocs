import * as mammoth from 'mammoth';
import { DocumentDetector } from "./document-detactor.interface";

export default class DocxDetector implements DocumentDetector {
    supports(mimeType: string, extension: string): boolean {
        return ( 
            mimeType ===
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            extension === '.docx'
        );           
    }

    async detect(file: Buffer): Promise<{ mimeType: string; extension: string; fileSizeMB: number; pageCount?: number; }> {
        let estimatedPageCount : number | undefined;
        
        try {
            const result = await mammoth.extractRawText({buffer: file});
            const text = result.value || '';

            const wordCount = text.trim().split(/\s+/).length;
            estimatedPageCount = Math.max(1, Math.ceil(wordCount / 500));
        } catch (err) {
            estimatedPageCount = undefined;
        }

        return {
            mimeType: 
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            extension: '.docx',
            fileSizeMB: Number((file.length / 1024 / 1024).toFixed(2)),
            pageCount: estimatedPageCount,
        };
    }
}