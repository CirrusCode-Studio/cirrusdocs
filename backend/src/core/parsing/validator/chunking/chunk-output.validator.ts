import { BadRequestException } from '@nestjs/common';
import { DocumentChunk } from './chunk-output.contract';

export class ChunkOutputValidator {
    static validate(chunks: DocumentChunk[]): void {
        if (!Array.isArray(chunks) || chunks.length === 0) {
            throw new BadRequestException('Chunk list is empty');
        }

        chunks.forEach((chunk, i) => {
            if (!chunk.chunkId) {
                throw new BadRequestException(`chunkId missing at index ${i}`);
            }

            if (!chunk.docId) {
                throw new BadRequestException(`docId missing at index ${i}`);
            }

            if (typeof chunk.index !== 'number') {
                throw new BadRequestException(`Invalid chunk index at ${i}`);
            }

            if (!chunk.content || chunk.content.trim().length === 0) {
                throw new BadRequestException(`Empty chunk content at ${i}`);
            }

            const meta = chunk.metadata;
            if (!meta?.source || !meta.language) {
                throw new BadRequestException(`Metadata missing at chunk ${i}`);
            }

            if (
                typeof meta.startOffset !== 'number' ||
                typeof meta.endOffset !== 'number'
            ) {
                throw new BadRequestException(
                `Invalid offsets at chunk ${i}`,
                );
            }

            if (meta.endOffset <= meta.startOffset) {
                throw new BadRequestException(
                `endOffset must be > startOffset at chunk ${i}`,
                );
            }
        });
    }
}
