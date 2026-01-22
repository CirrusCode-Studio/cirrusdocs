// import { RetrievalRequest } from '@/core/contracts/retrieval';
import { RetrievalRequest } from '@/core/parsing/contracts/retrievals/retrieval-request.contract';
export class RetrievalRequestValidator {
    static validate(request: RetrievalRequest): void {
        if (!request) {
            throw new Error('RetrievalRequest is required');
        }

        if (!request.query || request.query.trim().length === 0) {
            throw new Error('RetrievalRequest.query is missing or empty');
        }

        if (
        !Array.isArray(request.queryEmbedding) ||
        request.queryEmbedding.length === 0
        ) {
            throw new Error('RetrievalRequest.queryEmbedding missing');
        }

        if (request.queryEmbedding.some(v => typeof v !== 'number')) {
            throw new Error('RetrievalRequest.queryEmbedding contains non-number');
        }

        if (typeof request.topK !== 'number' || request.topK <= 0) {
            throw new Error('RetrievalRequest.topK must be > 0');
        }

        if (request.filters?.docIds && !Array.isArray(request.filters.docIds)) {
            throw new Error('filters.docIds must be array');
        }
    }
}
