import { RetrievalRequest } from './retrieval-request.contract';
import { RetrievalResult } from './retrieval-result.contract';

export interface RetrievalEngine {
    retrieve(request: RetrievalRequest): Promise<RetrievalResult>;
}
