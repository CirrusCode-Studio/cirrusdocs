import { DocumentStatus } from "@prisma/client";
import { Document } from "../../domain/entities/document.entity";
import { DocumentRepository } from "../../domain/repositories/document.repository";
import { DocumentPolicyService } from "../../domain/services/doc-policy.service";
import { DocumentEventPublisher } from "../../infrastructure/messaging/document-event.publisher";
import type { FileStorage } from "../../infrastructure/storage/file-storage.interface";
import { UploadDocCommand } from "../commands/upload-doc.command";
import { DocUploadedEvent } from "../events/doc-uploaded.event";
import { extname } from "path";
import { Inject } from "@nestjs/common";
import { FILE_STORAGE } from "../../infrastructure/storage/file-storage.token";

class UploadDocumentUseCase {
    constructor(
        private readonly repo: DocumentRepository,
        @Inject(FILE_STORAGE)
        private readonly storage: FileStorage,
        private readonly policy: DocumentPolicyService,
        private readonly publisher: DocumentEventPublisher
    ) {}

    async execute(cmd: UploadDocCommand): Promise<{ id: string }> {
        this.policy.validateUpload(
            cmd.mimeType,
            cmd.size,
        );

        const docId = crypto.randomUUID();
        const extension = extname(cmd.originalName);
        const storageDir = `${cmd.workspaceId}`;
        const storedName = `${docId}${extension}`;
        const storagePath = `${storageDir}/${storedName}`;
    
        await this.storage.save(storagePath, cmd.buffer);

        const document = new Document({
            id: docId,
            workspaceId: cmd.workspaceId,
            ownerId: cmd.userId,
            originalName: cmd.originalName,
            mimeType: cmd.mimeType,
            extension: extension.replace('.', ''),
            storedName: storedName,
            size: BigInt(cmd.size),
            storagePath,
            status: DocumentStatus.UPLOADED,
            createdAt: new Date(),
            updatedAt: new Date(),

        });

        await this.repo.save(document);
        
        await this.publisher.publish(
            new DocUploadedEvent(docId, cmd.workspaceId),
        );

        return {id: docId};
    }
}

export default UploadDocumentUseCase;