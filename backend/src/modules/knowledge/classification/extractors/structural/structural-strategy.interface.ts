import { DocumentSignals } from "@/core/contracts/classification/document-signals.contract";

export interface StructuralStrategy {
    supports(mimeType: string, extenstion: string): boolean;

    extract(
        file: Buffer,
        meta: {
            pageCount: number;
        }
    ): Promise<DocumentSignals['structural']>;
}