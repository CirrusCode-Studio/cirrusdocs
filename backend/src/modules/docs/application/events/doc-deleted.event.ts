// doc-uploaded.event.ts
import { DomainEvent } from "../../domain/events/domain-event";

export class DocDeletedEvent implements DomainEvent {
    readonly name = 'doc.deleted';
    readonly occurredAt = new Date();

    constructor(
        public readonly documentId: string,
    ) {}
}
