import { BadRequestException } from '@nestjs/common';
import { VectorRecord } from '@/core/parsing/contracts/vector-store/vector-record.contract';

export class VectorStoreValidator {
    static validate(record: VectorRecord): void {
        if (!record.id) {
            throw new BadRequestException('VectorRecord.id missing');
        }

        if (!Array.isArray(record.vector) || record.vector.length === 0) {
            throw new BadRequestException('VectorRecord.vector invalid');
        }

        if (record.vector.some(v => typeof v !== 'number')) {
            throw new BadRequestException('Vector contains non-numbers');
        }

        if (!record.payload?.docId || !record.payload?.chunkId) {
            throw new BadRequestException('payload.docId or chunkId missing');
        }
    }
}
