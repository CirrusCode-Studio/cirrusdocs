// domain/events/domain-event.ts
export interface DomainEvent {
    readonly name: string;
    readonly occurredAt: Date;
}