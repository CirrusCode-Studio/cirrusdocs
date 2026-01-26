import { StorageProvider } from '@prisma/client';
import { PrismaService } from "src/prisma/prisma.service";
import { Document } from "../../domain/entities/document.entity";
import { DocumentRepository } from '../../domain/repositories/document.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
class PrismaDocumentRepository implements DocumentRepository {
    constructor(
        private prisma: PrismaService,
    ) {}

    async save(document: Document) {
        await this.prisma.documentFile.create({
            data: {
                ...document.toPrimitives(),
                storageProvider: StorageProvider.LOCAL,
            },
        });
    }
    
    async findById(id: string): Promise<Document | null> {
        const doc = await this.prisma.documentFile.findFirst({
            where: {
                id: id
            },
        });
        return (doc) ? new Document(doc) : null;
    }

    async findByIdScoped(id: string, workspaceId: string): Promise<Document | null> {
        const doc = await this.prisma.documentFile.findFirst({
            where: {
                id: id,
                workspaceId: workspaceId,
            },
        });
        return (doc) ? new Document(doc) : null;
    }
    
    async findByWorkspace( input : { workspaceId: string; requesterId: string; }): Promise<Document[]> {
        const records = await this.prisma.documentFile.findMany({
            where: {
                workspaceId: input.workspaceId,
                deletedAt: null,
            },
            orderBy: { createdAt: 'desc' },
        });

        return records.map(record => new Document(record));
    }
    
    async softDelete(id: string, deletedAt: Date): Promise<void> {
        await this.prisma.documentFile.update({
            where: { id },
            data: {
                status: 'DELETED',
                deletedAt,
            },
        });
    }

    async listByWorkspace({ workspaceId, requesterId }: { workspaceId: string; requesterId: string }): Promise<Document[]> {
        const docs = await this.prisma.documentFile.findMany({
            where: {
                workspaceId,
                ownerId: requesterId,
                deletedAt: null,
            },
        });
        return docs.map(doc => new Document(doc));
    }
}

export { PrismaDocumentRepository }

//     id?: string
//     workspaceId: string
//     ownerId: string
//     originalName: string
//     storedName: string
//     extension: string
//     mimeType: string
//     size: bigint | number
//     storageProvider: $Enums.StorageProvider
//     storagePath: string
//     status?: $Enums.DocumentStatus
//     errorMessage?: string | null
//     createdAt?: Date | string
//     updatedAt?: Date | string
//     deletedAt?: Date | string | null