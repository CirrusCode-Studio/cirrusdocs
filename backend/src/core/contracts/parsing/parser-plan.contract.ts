import { BaseCompute } from "@/modules/knowledge/parsing/compute/base-compute.interface";
import { QualityGate } from "@/modules/knowledge/parsing/fusion/quality-gates/quality-gate-result.contract";

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