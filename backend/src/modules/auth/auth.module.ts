import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordService } from './crypto/password.service';
import { ConfigService } from '@nestjs/config';
import { LoginAttemptService } from './security';
import { WorkspaceService } from '../workspace/workspace.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_ACCESS_SECRET');

        if (!secret) {
          throw new Error('JWT_ACCESS_SECRET is not defined');
        }

        return {
          secret,
          signOptions: {
            expiresIn: '15m',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, PasswordService, JwtStrategy, LoginAttemptService, WorkspaceService],
  exports: [JwtModule],
})
export class AuthModule {}
