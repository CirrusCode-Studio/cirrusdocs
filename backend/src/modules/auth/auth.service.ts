import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './crypto/password.service';
import * as crypto from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginAttemptService } from './security';
import { AuthException } from 'src/common/exceptions/auth/auth.exception';
import { AuthError } from 'src/common/errors/auth-error.enum';
import { WorkspaceService } from '../workspace/workspace.service';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
        private readonly passwordService: PasswordService,
        private readonly loginAttemptService: LoginAttemptService,
        private readonly workspaceService: WorkspaceService,
    ) {}

    async register(email: string, password: string) {
        email = email.toLowerCase().trim()

        try {
            const passwordHash = await this.passwordService.hash(password)

            return await this.prisma.$transaction(async (tx) => {
            // 1. Create user
            const user = await tx.user.create({
                data: {
                    email,
                    passwordHash,
                },
            })

            // 2. Create personal workspace
            try {
                await this.workspaceService.createPersonalWorkspace(user.id, tx)
            } catch (err) {
                // LOG CHÍNH XÁC NGUỒN LỖI
                throw new AuthException(
                    AuthError.WORKSPACE_CREATE_FAILED,
                    'Failed to create personal workspace',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                )
            }

            // 3. Issue tokens
            const tokens = await this.issueTokens(user.id, user.email, tx)

            return tokens
            })
        } catch (err) {
            // Prisma unique constraint (email trùng)
            if (err?.code === 'P2002') {
                throw new AuthException(
                    AuthError.EMAIL_ALREADY_EXISTS,
                    'Email already registered',
                    HttpStatus.CONFLICT,
            )
            }

            // AuthException → giữ nguyên
            if (err instanceof AuthException) {
                throw err
            }

            // UNKNOWN ERROR
            throw new AuthException(
                AuthError.REGISTER_FAILED,
                'Register failed',
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }

    async login(email: string, password: string, ip: string) {
        email = email.toLowerCase().trim();

        
        const user = await this.prisma.user.findUnique({ where: { email } });
        
        if (!user) throw new UnauthorizedException();

        const passwordValid = user 
            ? await this.passwordService.compare(password, user.passwordHash)
            : false;

        if (!passwordValid) {
            await this.loginAttemptService.hit(email, ip);
            throw new AuthException(
                AuthError.INVALID_CREDENTIALS,
                'Invalid email or password',
                HttpStatus.UNAUTHORIZED,
            );
        }

        await this.loginAttemptService.reset(email, ip);
        
        return this.issueTokens(user.id, user.email);
    }

    async logout(userId: string, refreshToken: string) {
        const tokenHash = crypto
            .createHash('sha256')
            .update(refreshToken)
            .digest('hex');

        const token = await this.prisma.refreshToken.findFirst({
            where: {
                tokenHash,
                userId,
                revokedAt: null,
            },
        });

        if (!token) {
            // idempotent logout
            return { success: true };
        }

        await this.prisma.refreshToken.update({
            where: { id: token.id },
            data: {
            revokedAt: new Date(),
            },
        });

        return { success: true };
    }

    async refresh(refreshToken: string) {
        const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

        const stored = await this.prisma.refreshToken.findFirst({
            where: { tokenHash },
            include: { user: true },
        });

        if (!stored) {
            throw new UnauthorizedException();
        }

        if (stored.revokedAt) {
            // REUSE DETECTED
            await this.prisma.refreshToken.updateMany({
            where: {
                userId: stored.userId,
                revokedAt: null,
            },
            data: { revokedAt: new Date() },
            });

            throw new UnauthorizedException('Refresh token reuse detected');
        }

        if (stored.expiresAt < new Date()) {
            throw new UnauthorizedException();
        }

        const { accessToken, refreshToken: newRefresh } =
            await this.issueTokens(stored.user.id, stored.user.email);

        const newHash = crypto.createHash('sha256').update(newRefresh).digest('hex');

        await this.prisma.refreshToken.update({
            where: { id: stored.id },
            data: {
            revokedAt: new Date(),
            replacedBy: newHash,
            },
        });

        return { accessToken, refreshToken: newRefresh };
    }

    private async issueTokens(
        userId: string,
        email: string,
        prisma: Prisma.TransactionClient | PrismaClient = this.prisma,
        ) {
        const accessToken = this.jwt.sign(
            { sub: userId, email },
            { expiresIn: '15m' },
        )

        const refreshToken = crypto.randomBytes(32).toString('hex')
        const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

        await prisma.refreshToken.create({
            data: {
            userId,
            tokenHash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        })

        return { accessToken, refreshToken }
    }

}
