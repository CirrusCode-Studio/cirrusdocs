// src/ingestion/guards/guard-registry.ts
import { RuntimeGuard } from './runtime-guard.interface';

export class GuardRegistry {
    private readonly guards = new Map<string, RuntimeGuard[]>();

    register(step: string, guard: RuntimeGuard) {
        const list = this.guards.get(step) ?? [];
        list.push(guard);
        this.guards.set(step, list);
    }

    get(step: string): RuntimeGuard[] {
        return this.guards.get(step) ?? [];
    }
}