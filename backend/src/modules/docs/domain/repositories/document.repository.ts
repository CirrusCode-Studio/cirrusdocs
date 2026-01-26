import { Document } from "../entities/document.entity";

export abstract class DocumentRepository {
    abstract save(document: Document);
    abstract findById(id: string): Promise<Document | null>;
    abstract softDelete(id: string, deletedAt: Date): Promise<void>;
    abstract findByWorkspace({ workspaceId, requesterId }: { workspaceId: string; requesterId: string }): Promise<Document[]>;
    abstract findByIdScoped(id: string, workspaceId: string): Promise<Document | null>;
}