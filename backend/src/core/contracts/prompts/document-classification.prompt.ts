// src/core/prompts/document-classification.prompt.ts
import { DocumentType } from '@/core/contracts/classification/document-type.enum';

export function buildDocumentClassificationPrompt(input: {
    headings: string[];
    metadata?: Record<string, any>;
}) {
    return `
        You are a document classification engine.

        Your task:
        Classify the document into EXACTLY ONE of the following types:

        ${Object.values(DocumentType).join(', ')}

        Rules:
        - Return STRICT JSON only
        - No markdown
        - No explanation outside JSON
        - confidence MUST be between 0 and 1
        - If unsure, use type "UNKNOWN"

        JSON schema (DO NOT DEVIATE):
        {
        "type": "DocumentType",
        "confidence": number,
        "signals": {
            "reason": string,
            "keywords": string[],
            "headingsSample": string[]
        }
        }

        Document metadata:
        ${JSON.stringify(input.metadata ?? {}, null, 2)}

        Headings:
        ${input.headings.slice(0, 20).join('\n')}
    `;
}
