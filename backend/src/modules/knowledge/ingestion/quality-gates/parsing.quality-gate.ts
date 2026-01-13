import { QualityGate } from "./quality-gate.interface";
import { IngestionExecution } from "../ingestion-execution";
import { QualityGateResult } from "./quality-gate.interface";

export class ParsingQualityGate implements QualityGate {
    name = 'PARSING_QUALITY';

    evaluate({ runtime }: IngestionExecution): QualityGateResult {
        const parsed = runtime.parsing.parsedDocument;

        const textLength = (parsed as any)?.text?.length ?? 0;

        if (textLength < 100) {
            return {
                pass: false,
                warnings: ['Parsed content too short'],
                metrics: { textLength },
            };
        }

        return {
            pass: true,
            metrics: { textLength },
        };
    }
}
