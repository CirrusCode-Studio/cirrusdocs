import { FusionRule } from "./fusion-rule.interface";

export class FusionRuleRegistry {
    private readonly rules: FusionRule[] = [];

    register(rule: FusionRule) {
        this.rules.push(rule);
    }

    getRules(): FusionRule[] {
        return [...this.rules].sort((a,b) => a.priority - b.priority);
    }
}