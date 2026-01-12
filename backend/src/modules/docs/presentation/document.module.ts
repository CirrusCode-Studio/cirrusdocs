import { DocumentEventPublisher } from './../infrastructure/messaging/document-event.publisher';
import { Module } from "@nestjs/common";
import DocumentController from "./document.controller";
import { PrismaService } from "src/prisma/prisma.service";
import LocalStorageService from '../infrastructure/storage/local-storage.service';
import { PrismaDocumentRepository } from '../infrastructure/persistence/prisma-document.repository';
import { DocumentPolicyService } from '../domain/services/doc-policy.service';
import UploadDocumentUseCase from '../application/use-cases/upload-doc.usecase';
import { DOCUMENT_STORAGE_PROVIDER } from '../infrastructure/config/doc-storage.config';
import { FILE_STORAGE } from '../infrastructure/storage/file-storage.token';
import { DocumentRepository } from '../domain/repositories/document.repository';
import { FileStorage } from '../infrastructure/storage/file-storage.interface';
import S3StorageService from '../infrastructure/storage/s3-storage.service';
import DeleteDocumentUseCase from '../application/use-cases/delete-doc.usecase';

@Module({
    controllers: [DocumentController],
    providers: [
        PrismaService,
        {
            provide: DocumentRepository,
            useClass: PrismaDocumentRepository,
        },
        {
            provide: FILE_STORAGE,
            useFactory: () => {
                const provider = process.env.STORAGE_PROVIDER;
                if (!provider) 
                    return new LocalStorageService();
                return new S3StorageService();
            }
        },
        DocumentPolicyService,
        DocumentEventPublisher,
        {
            provide: UploadDocumentUseCase,
            useFactory: (
                repo: DocumentRepository,
                storage: FileStorage,
                policy: DocumentPolicyService,
                publisher: DocumentEventPublisher,
            ) =>
                new UploadDocumentUseCase(repo, storage, policy, publisher),
            inject: [
                DocumentRepository,
                FILE_STORAGE,
                DocumentPolicyService,
                DocumentEventPublisher,
            ],
        },
        DeleteDocumentUseCase,
        {
            provide: DOCUMENT_STORAGE_PROVIDER,
            useValue: process.env.DOC_STORAGE_PROVIDER ?? 'LOCAL',
        },
    ],
})
export class DocumentModule {};