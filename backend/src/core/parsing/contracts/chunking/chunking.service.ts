import { NormalizedDocument } from '../normalize/normalize-output.contract';
import { randomUUID } from 'crypto';
import { DocumentChunk } from './chunk-output.contract';

export interface ChunkingOptions {
    maxChars: number;
    overlap: number;
}

export class ChunkingService {
    constructor(
        private readonly options: ChunkingOptions = {
        maxChars: 1000,
        overlap: 100,
        },
    ) {}

    chunk(doc: NormalizedDocument): DocumentChunk[] {
        const text = doc.cleanText;
        const chunks: DocumentChunk[] = [];

        let start = 0;
        let index = 0;

        while (start < text.length) {
        let end = start + this.options.maxChars;

        if (end < text.length) {
            end = this.findSemanticBreak(text, end);
        }

        const content = text.slice(start, end).trim();
        if (!content) break;

        chunks.push({
            chunkId: randomUUID(),
            docId: doc.docId,
            index,
            content,
            metadata: {
                source: doc.source,
                language: doc.language,
                startOffset: start,
                endOffset: end,
            },
        });

        index++;
        start = end - this.options.overlap;
        if (start < 0) start = 0;
        }

        return chunks;
    }

    /**
     * Try to break chunk at sentence boundary
     */
    private findSemanticBreak(text: string, preferredEnd: number): number {
        const slice = text.slice(preferredEnd - 200, preferredEnd + 1);
        const lastSentenceEnd = Math.max(
            slice.lastIndexOf('.'),
            slice.lastIndexOf('?'),
            slice.lastIndexOf('!'),
            slice.lastIndexOf('\n'),
        );

        if (lastSentenceEnd === -1) {
            return preferredEnd;
        }

        return preferredEnd - (slice.length - lastSentenceEnd - 1);
    }
}
