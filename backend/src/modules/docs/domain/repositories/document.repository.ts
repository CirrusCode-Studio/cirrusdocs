import { DocumentStatus } from "@prisma/client";
import { Document } from "../entities/document.entity";

export abstract class DocumentRepository {
    abstract save(document: Document);
    abstract findById(id: string): Promise<Document | null>;
    abstract softDelete(id: string, deletedAt: Date): Promise<void>;
}