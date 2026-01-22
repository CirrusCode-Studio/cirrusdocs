// import { RetrievalResult } from '@/core/contracts/retrieval';
import { RetrievalResult } from '@/core/contracts/retrievals/retrieval-result.contract';
export class RetrievalResultValidator {
    static validate(result: RetrievalResult): void {
        if (!result) {
            throw new Error('RetrievalResult missing');
        }

        if (!Array.isArray(result.selectedChunks)) {
            throw new Error('RetrievalResult.selectedChunks must be array');
        }

        for (const chunk of result.selectedChunks) {
            if (!chunk.chunkId || !chunk.docId) {
                throw new Error('RetrievedChunk missing chunkId or docId');
            }

            if (typeof chunk.text !== 'string') {
                throw new Error('RetrievedChunk.text must be string');
            }

            if (typeof chunk.score !== 'number') {
                throw new Error('RetrievedChunk.score must be number');
            }
        }

        if (!result.diagnostics) {
            throw new Error('RetrievalResult.diagnostics missing');
        }
    }
}
