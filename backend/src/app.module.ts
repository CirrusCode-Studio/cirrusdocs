import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './infra/redis/redis.module';
import { UsersModule } from './modules/users/users.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { DocumentModule } from './modules/docs/presentation/document.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
    UsersModule,
    WorkspaceModule,
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
