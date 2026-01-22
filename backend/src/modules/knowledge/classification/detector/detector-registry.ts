import { DocumentDetector } from "./document-detactor.interface";

export interface DetectionHint {
    mimeType?: string;
    extension?: string;
}
export class DetectorRegistry {
    constructor(
        private readonly detectors: DocumentDetector[]
    ) {}

    private resolveDetector(hint: DetectionHint): DocumentDetector {
        const detector = this.detectors.find( d => 
            d.supports(
                hint.mimeType ?? '',
                hint.extension ?? ''
            )
        );

        if (!detector) {
            throw new Error(
                `No detector found for mime=${hint.mimeType}, ext=${hint.extension}`
            );
        }

        return detector;
    }

    async detect(
        file: Buffer,
        hint: DetectionHint = {}
    ) {
        const detector = this.resolveDetector(hint);
        return detector.detect(file);
    }
}