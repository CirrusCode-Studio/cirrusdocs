import { QualityGate } from "@/modules/knowledge/ingestion/quality-gates/quality-gate.interface";
import { BaseParser } from "@/modules/knowledge/parsing/parsers/base-parser.interface";

export interface ParsePlan {
    profileName: string;

    steps: Array<{
        parser: BaseParser;
        inputType: 'file' | 'blocks';
        enabled: boolean;
    }>;

    qualityGates: QualityGate[];
    fallback?: ParsePlan;
}