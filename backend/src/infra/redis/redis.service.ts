import { Injectable, OnModuleDestroy } from "@nestjs/common";
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
    private client: Redis;

    constructor() {
        this.client = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
        });
    }

    getClient(): Redis {
        return this.client;
    }

    async onModuleDestroy() {
        await this.client.quit();
    }
}