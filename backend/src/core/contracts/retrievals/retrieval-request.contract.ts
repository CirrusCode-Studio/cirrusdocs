export interface RetrievalRequest {
    query: string;

    queryEmbedding: number[];

    topK: number;

    filters?: {
        docIds?: string[];
        language?: string;
        tags?: string[];
    };

    strategy?: RetrievalStrategy;

    debug?: boolean;
}

export type RetrievalStrategy =
  | 'vector_only'
  | 'hybrid'
  | 'keyword_boosted'
  | 'semantic_section';

