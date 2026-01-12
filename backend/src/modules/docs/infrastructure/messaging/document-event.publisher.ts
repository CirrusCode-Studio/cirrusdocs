import { DocUploadedEvent } from '../../application/events/doc-uploaded.event';
import { DomainEvent } from '../../domain/events/domain-event';

export class DocumentEventPublisher {
    async publish(event: DomainEvent) {
        // Redis / Kafka / BullMQ / EventEmitter
        console.log('Document uploaded event', event);
    }
}
