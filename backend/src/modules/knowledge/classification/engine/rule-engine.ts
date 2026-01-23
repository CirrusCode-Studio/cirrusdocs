import { ClassificationRule } from "../rules/rule.interface";
import { DocumentSignals } from "@/core/contracts/classification/document-signals.contract";
import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";

export class RuleEngine {
    constructor(
        private readonly rules: ClassificationRule[]
    ) {}

    evaluate(
        docId: string,
        signals: DocumentSignals
    ): DocumentProcessingProfile {
        const matched = this.rules
            .filter(r => r.match(signals))
            .sort((a, b) => b.weight - a.weight);

        let profile: Partial<DocumentProcessingProfile> = {
            docId,
            signals,
            matched_rules: [],
            confidence: 0,
        };

        for (const rule of matched) {
            profile = rule.apply(profile, signals);
            profile.matched_rules!.push(rule.name);
            profile.confidence! += rule.weight;
        }

        profile.confidence = Math.min(1, profile.confidence!);

        return profile as DocumentProcessingProfile;
    }
}
