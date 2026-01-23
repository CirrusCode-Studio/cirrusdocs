import { ClassificationRule } from "./rule.interface";
import { ScannedRule } from "./scanned.rule";
import { AcademicRule } from "./academic.rule";
import { SlideRule } from "./slide.rule";

export class RuleRegistry {
    private readonly rules: ClassificationRule[] = [
        new ScannedRule(),   // weight cao → override mạnh
        new AcademicRule(),
        new SlideRule(),
    ];

    getAll(): ClassificationRule[] {
        return this.rules;
    }
}
