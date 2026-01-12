-- AlterTable
ALTER TABLE "DocumentFile" ADD COLUMN     "category" TEXT,
ADD COLUMN     "checksum" TEXT,
ADD COLUMN     "chunkCount" INTEGER,
ADD COLUMN     "indexedAt" TIMESTAMP(3),
ADD COLUMN     "isLatest" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "pageCount" INTEGER,
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "DocumentFile_ownerId_idx" ON "DocumentFile"("ownerId");

-- CreateIndex
CREATE INDEX "DocumentFile_checksum_idx" ON "DocumentFile"("checksum");

-- AddForeignKey
ALTER TABLE "DocumentFile" ADD CONSTRAINT "DocumentFile_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "DocumentFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
