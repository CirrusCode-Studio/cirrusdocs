import { ClassificationRule } from '../rules/rule.interface';
import { DocumentSignals } from '@/core/parsing/contracts/classification/document-signals.contract';
import { DocumentProcessingProfile } from '@/core/parsing/contracts/classification/document-processing-profile.contract';

export class RuleEngine {
    constructor(private readonly rules: ClassificationRule[]) {}

    evaluate(
        docId: string,
        signals: DocumentSignals
    ): DocumentProcessingProfile {
        const matched: ClassificationRule[] = this.rules.filter(r =>
        r.match(signals)
        );

        let partial: Partial<DocumentProcessingProfile> = {
        docId,
        signals,
        matched_rules: matched.map(r => r.name),
        };

        for (const rule of matched) {
        partial = { ...partial, ...rule.apply(partial) };
        }

        return {
        ...partial,
        confidence: Math.min(
            1,
            matched.reduce((s, r) => s + r.weight, 0)
        ),
        } as DocumentProcessingProfile;
    }
}
