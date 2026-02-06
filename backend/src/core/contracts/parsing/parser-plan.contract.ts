import { QualityGate } from "@/modules/knowledge/ingestion/quality-gates/quality-gate.interface";
import { BaseCompute } from "@/modules/knowledge/parsing/compute/base-compute.interface";

export interface ParsePlan {
    profileName: string;

    steps: Array<{
        compute: BaseCompute;
        inputType: 'file' | 'blocks';
        enabled: boolean;
    }>;

    qualityGates: QualityGate[];
    fallback?: ParsePlan;
}