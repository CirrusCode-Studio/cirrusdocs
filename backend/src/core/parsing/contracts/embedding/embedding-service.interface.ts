import { DocumentChunk } from '../chunking/chunk-output.contract';
import { EmbeddingVector } from './embedding.contract';

export interface EmbeddingService {
    embed(chunks: DocumentChunk[]): Promise<EmbeddingVector[]>;
}
