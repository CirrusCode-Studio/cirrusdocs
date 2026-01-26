import { Injectable } from "@nestjs/common";
import { DocumentRepository } from "../../domain/repositories/document.repository";
import { Document } from "../../domain/entities/document.entity";

@Injectable()
export default class ListDocumentUseCase {
    constructor(
        private readonly repo: DocumentRepository,
    ){}

    async execute(input: {
        workspaceId: string;
        requesterId: string;
    }) : Promise<Document[]>{
        const docs = await this.repo.findByWorkspace({
            workspaceId: input.workspaceId,
            requesterId: input.requesterId,
        });

        return docs;
    }
}