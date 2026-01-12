import { Global, Module } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { REDIS_CLIENT } from "./redis.constants";

@Global()
@Module({
    providers: [
        RedisService,
        {
            provide: REDIS_CLIENT,
            useFactory: (redisservice: RedisService) => 
                redisservice.getClient(),
            inject: [RedisService],
        },
    ],
    exports: [REDIS_CLIENT],
})
export class RedisModule {}