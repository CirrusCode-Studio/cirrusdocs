import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { REDIS_CLIENT } from "src/infra/redis/redis.constants";

@Injectable()
export class LoginAttemptService {
    private readonly MAX_ATTEMPTS = 5;
    private readonly BLOCK_DURATION_SECONDS = 300; // 5 minutes
    constructor(
        @Inject(REDIS_CLIENT) private readonly redis: Redis,
    ) {}

    private key(email: string, ip: string) {
        return `login:user:${email}:${ip}`;
    }

    async hit(email: string, ip: string): Promise<number> {
        const key = this.key(email, ip);
        const attempts = await this.redis.incr(key);

        console.log('[LOGIN ATTEMPT HIT]', {
            key,
            attempts,
        });

        if (attempts === 1) {
            await this.redis.expire(key, this.BLOCK_DURATION_SECONDS);
        }

        return attempts;
    }

    async getAttempts(email: string, ip: string): Promise<number> {
        const attempts = await this.redis.get(this.key(email,ip));
        return Number(attempts) || 0;
    }

    async isBlocked(email: string, ip: string): Promise<boolean> {
        const attempts = await this.redis.get(this.key(email, ip));
        return Number(attempts) >= this.MAX_ATTEMPTS;
    }

    async reset(email: string, ip: string) { 
        await this.redis.del(this.key(email, ip));
    }

    isBlockedByAttempts(attempts: number): boolean {
        return attempts >= this.MAX_ATTEMPTS;
    }
    
    getDelaySeconds(attempts: number): number {
        if (attempts >= this.MAX_ATTEMPTS) return 60;
        if (attempts === 4) return 15;
        if (attempts === 3) return 5;
        return 0;
    }
}