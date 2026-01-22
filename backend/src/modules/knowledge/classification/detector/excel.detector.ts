import * as XLSX from 'xlsx';
import { DocumentDetector } from './document-detactor.interface';

export default class ExcelDetector implements DocumentDetector {
    supports(mimeType: string, extension: string): boolean {
        return (
            mimeType === 'application/vnd.ms-excel' ||
            mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            extension === '.xls' ||
            extension === '.xlsx'
        );
    }

    async detect(
        file: Buffer
    ): Promise<{
        mimeType: string;
        extension: string;
        fileSizeMB: number;
        pageCount?: number;
    }> {
        let sheetCount: number | undefined;

        try {
        const workbook = XLSX.read(file, { type: 'buffer' });
        sheetCount = workbook.SheetNames.length;
        } catch (err) {
        /**
         * Không throw.
         * sheetCount undefined = "metadata unreliable"
         * RuleEngine sẽ quyết định xử lý tiếp hay fallback
         */
        sheetCount = undefined;
        }

        return {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        extension: '.xlsx',
        fileSizeMB: Number((file.length / 1024 / 1024).toFixed(2)),
        pageCount: sheetCount,
        };
    }
}
