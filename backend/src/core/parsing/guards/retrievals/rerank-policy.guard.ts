// import { RetrievalRequest } from '@/core/contracts/retrieval';
import { RetrievalRequest } from '@/core/parsing/contracts/retrievals/retrieval-request.contract';
export interface RerankPolicyContext {
    latencyBudgetMs: number;
    rerankEnabled: boolean;
}

export class RerankPolicyGuard {
    static enforce(
        request: RetrievalRequest,
        context: RerankPolicyContext,
    ): void {
        if (context.latencyBudgetMs < 300) {
            request.strategy = 'vector_only';
        }

        if (!context.rerankEnabled) {
            request.strategy = 'vector_only';
        }
    }
}
