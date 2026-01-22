import { BadRequestException } from '@nestjs/common';
import { EmbeddingVector } from '../../parsing/contracts/embedding/embedding.contract';

export class EmbeddingValidator {
    static validate(vector: EmbeddingVector): void {
        if (!vector.embeddingId) {
            throw new BadRequestException('embeddingId missing');
        }

        if (!vector.docId || !vector.chunkId) {
            throw new BadRequestException('docId or chunkId missing');
        }

        if (!Array.isArray(vector.vector) || vector.vector.length === 0) {
            throw new BadRequestException('Embedding vector empty');
        }

        if (vector.vector.some(v => typeof v !== 'number')) {
            throw new BadRequestException('Embedding vector contains non-numbers');
        }

        const meta = vector.metadata;
        if (!meta?.model || !meta.dimensions) {
            throw new BadRequestException('Embedding metadata incomplete');
        }

        if (meta.dimensions !== vector.vector.length) {
            throw new BadRequestException(
                'Vector length does not match dimensions',
            );
        }

        if (!meta.createdAt) {
            throw new BadRequestException('createdAt missing');
        }
    }
}
