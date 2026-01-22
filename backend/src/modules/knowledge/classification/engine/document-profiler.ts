import { DetectorRegistry, DetectionHint } from './../detector/detector-registry';
import { StructuralSignalExtractor } from '../extractors/structural-signal.extractor';
import { RuleEngine } from './rule-engine';
import { DeterministicSignalExtractor } from '../extractors/deterministic-signal.extractor';

export class DocumentProfiler {
    constructor(
        private readonly detectorRegistry: DetectorRegistry,
        private readonly deterministicExtractor: DeterministicSignalExtractor,
        private readonly structuralExtractor: StructuralSignalExtractor,
        private readonly ruleEngine: RuleEngine,
    ) {}

    async profile(input: {
        docId: string;
        file: Buffer;
        hint?: {
            mimeType?: string;
            extension?: string;
        }
    }) {
        const rawMeta = await this.detectorRegistry.detect(
            input.file,
            input.hint
        );

        const deterministic = this.deterministicExtractor.extract(rawMeta);

        const structural =
            this.structuralExtractor.extract(
                input.file, {
                    mimeType: deterministic.mimeType,
                    extendsion: deterministic.fileExtension,
                    pageCount: deterministic.pageCount,
                });

        const signals = { deterministic, structural };

        return this.ruleEngine.evaluate(input.docId, signals);
    }
}
