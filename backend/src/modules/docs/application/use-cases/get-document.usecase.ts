import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { DocumentRepository } from "../../domain/repositories/document.repository";
import { Document } from "../../domain/entities/document.entity";

@Injectable()
export default class GetDocumentUseCase {
    constructor(
        private readonly repo: DocumentRepository,
    ) {}

    async execute(input: {
        documentId: string;
        workspaceId: string;
        requesterId: string;
    }): Promise<Document> {
        const doc = await this.repo.findByIdScoped(
            input.documentId,
            input.workspaceId,
        );

        if (!doc) 
            throw new NotFoundException('Document not found');

        if (!doc.canBeViewedBy(input.requesterId))
            throw new ForbiddenException('Access to document is forbidden');

        return doc;
    }
}