import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new PrismaExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// auth
// users
// workspaces
// projects (optional)
// documents
// knowledge-bases
// chats
// ai-config
// rag
// ingestion
// usage
// quota
// billing
// audit
// notifications
// admin
// storage
// integrations
