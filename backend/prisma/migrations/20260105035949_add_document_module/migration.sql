-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('UPLOADED', 'PROCESSING', 'READY', 'FAILED', 'DELETED');

-- CreateEnum
CREATE TYPE "StorageProvider" AS ENUM ('LOCAL', 'S3', 'R2');

-- CreateEnum
CREATE TYPE "DocStep" AS ENUM ('PARSE', 'CHUNK', 'EMBED');

-- CreateTable
CREATE TABLE "DocumentFile" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "storedName" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" BIGINT NOT NULL,
    "storageProvider" "StorageProvider" NOT NULL,
    "storagePath" TEXT NOT NULL,
    "status" "DocumentStatus" NOT NULL DEFAULT 'UPLOADED',
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "DocumentFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentProcessingLog" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "step" "DocStep" NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentProcessingLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DocumentFile_workspaceId_idx" ON "DocumentFile"("workspaceId");

-- CreateIndex
CREATE INDEX "DocumentFile_status_idx" ON "DocumentFile"("status");

-- CreateIndex
CREATE INDEX "DocumentFile_createdAt_idx" ON "DocumentFile"("createdAt");

-- CreateIndex
CREATE INDEX "DocumentProcessingLog_documentId_idx" ON "DocumentProcessingLog"("documentId");
