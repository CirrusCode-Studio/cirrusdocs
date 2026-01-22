import { RetrievalRequest } from "@/core/parsing/contracts/retrievals/retrieval-request.contract";

export class TopKGuard {
    static readonly MAX_TOP_K = 50;

    static enforce(request: RetrievalRequest): void {
        if (request.topK > TopKGuard.MAX_TOP_K) {
            throw new Error(
                `topK ${request.topK} exceeds max allowed ${TopKGuard.MAX_TOP_K}`,
            );
        }
    }
}
