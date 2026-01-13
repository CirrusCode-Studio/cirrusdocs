// engine/rule-engine.ts
import { ClassificationRule } from '../rules/rule.interface';

export class RuleEngine {
    constructor(private readonly rules: ClassificationRule[]) {}

    evaluate(signals) {
        const matched = this.rules
            .filter(r => r.match(signals))
            .sort((a, b) => b.priority - a.priority);

        return matched;
    }
}
