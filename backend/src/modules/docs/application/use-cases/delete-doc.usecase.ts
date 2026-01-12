import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { DocumentRepository } from "../../domain/repositories/document.repository";
import { DocumentEventPublisher } from "../../infrastructure/messaging/document-event.publisher";
import { DeleteDocCommand } from "../commands/delete-doc.command";
import { DocDeletedEvent } from "../events/doc-deleted.event";

@Injectable()
class DeleteDocumentUseCase {
    constructor(
        private readonly repo: DocumentRepository,
        private readonly publisher: DocumentEventPublisher,
    ) {}

    async execute(cmd: DeleteDocCommand) {
        const doc = await this.repo.findById(cmd.documentId);
        if (!doc) 
            throw new NotFoundException({
                code: 'DOCUMENT_NOT_FOUND',
                message: 'Document not found',
            })

        // Authorization check
        if (doc.ownerId !== cmd.userId) {
            throw new ForbiddenException({
                code: 'DOCUMENT_FORBIDDEN',
                message: 'You do not have permission to delete this document',
            });
        }

        doc.softDetele();

        await this.repo.softDelete(doc.id, doc.deletedAt!);

        await this.publisher.publish(
            new DocDeletedEvent(cmd.documentId)
        );

        return {
            success: 'ok'
        }
    }
}

export default DeleteDocumentUseCase;