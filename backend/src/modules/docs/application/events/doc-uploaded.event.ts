// doc-uploaded.event.ts
import { DomainEvent } from "../../domain/events/domain-event";

export class DocUploadedEvent implements DomainEvent {
    readonly name = 'doc.uploaded';
    readonly occurredAt = new Date();

    constructor(
        public readonly documentId: string,
        public readonly workspaceId: string,
    ) {}
}
