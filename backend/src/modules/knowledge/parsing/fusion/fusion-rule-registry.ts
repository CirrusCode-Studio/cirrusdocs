import { FusionRule } from "./fusion-rule.interface";

export class FusionRuleRegistry {
    private readonly rules: FusionRule[] = [];

    register(rule: FusionRule) {
        this.rules.push(rule);
    }

    getRulesForType(blockType: string): FusionRule[] {
        return this.rules
            .filter(r => r.blockType === blockType)
            .sort((a, b) => a.priority - b.priority);
    } 
}