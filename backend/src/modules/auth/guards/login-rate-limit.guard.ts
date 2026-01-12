import { HttpStatus } from '@nestjs/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { LoginAttemptService } from "../security";
import { Request } from "express";
import { AuthError } from 'src/common/errors/auth-error.enum';
import { AuthException } from 'src/common/exceptions/auth/auth.exception';

const sleep = (ms: number) => 
    new Promise(resolve => setTimeout(resolve, ms));

@Injectable()
class LoginRateLimitGuard implements CanActivate {
    constructor(
        private readonly loginAttemptService: LoginAttemptService,
    ) {}

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const req = ctx.switchToHttp().getRequest<Request>();
        const ip = req.ip;
        const email = req.body?.email?.toLowerCase().trim();
        if (!email || !ip) {
            return true;
            }

            const attempts = await this.loginAttemptService.getAttempts(email, ip);

            // Hard block
            if (this.loginAttemptService.isBlockedByAttempts(attempts)) {
            throw new AuthException(
                AuthError.TOO_MANY_ATTEMPTS,
                'Too many login attempts. Please try again later.',
                HttpStatus.TOO_MANY_REQUESTS,
            );

            }

            // Progressive delay
            const delaySeconds =
            this.loginAttemptService.getDelaySeconds(attempts);

            if (delaySeconds > 0) {
            await sleep(delaySeconds * 1000);
        }

        return true;
    }
}

export { LoginRateLimitGuard };