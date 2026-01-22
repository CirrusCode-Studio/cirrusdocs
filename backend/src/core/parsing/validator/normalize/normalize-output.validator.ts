import { BadRequestException } from '@nestjs/common';
import { NormalizedDocument } from '../../parsing/contracts/normalize/normalize-output.contract';

export class NormalizeOutputValidator {
    static validate(doc: NormalizedDocument): void {
        if (!doc) {
            throw new BadRequestException('Normalized document is missing');
        }

        // ===== Required metadata =====
        if (!doc.docId || typeof doc.docId !== 'string') {
            throw new BadRequestException('docId is required and must be a string');
        }

        if (!doc.source || typeof doc.source !== 'string') {
            throw new BadRequestException('source is required and must be a string');
        }

        if (!doc.language || typeof doc.language !== 'string') {
            throw new BadRequestException('language is required');
        }

        // ===== Clean text validation =====
        if (!doc.cleanText || typeof doc.cleanText !== 'string') {
            throw new BadRequestException('cleanText must be a non-empty string');
        }

        const trimmed = doc.cleanText.trim();
        if (trimmed.length === 0) {
            throw new BadRequestException('cleanText is empty after trimming');
        }

        if (doc.cleanText !== trimmed) {
            throw new BadRequestException('cleanText must be trimmed');
        }

        // ===== Control characters check =====
        const hasControlChars = /[\u0000-\u001F\u007F]/.test(doc.cleanText);
        if (hasControlChars) {
            throw new BadRequestException(
                'cleanText contains control characters',
            );
        }

        // ===== Stats (optional but if present must be valid) =====
        if (doc.stats) {
            const { originalLength, cleanedLength } = doc.stats;

            if (
                typeof originalLength !== 'number' ||
                typeof cleanedLength !== 'number'
            ) {
                throw new BadRequestException('stats lengths must be numbers');
            }

            if (cleanedLength > originalLength) {
                throw new BadRequestException(
                'cleanedLength cannot exceed originalLength',
                );
            }
        }
    }
}
