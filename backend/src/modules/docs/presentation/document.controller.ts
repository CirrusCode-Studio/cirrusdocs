import { Get, Controller, Post, UploadedFile, UseInterceptors, Body, UseGuards, Req, Delete, Param } from "@nestjs/common";
import UploadDocumentUseCase from "../application/use-cases/upload-doc.usecase";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadDocDto } from "./dto/upload-doc.dto";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/modules/users/guards/roles.guard";
import { UserStatusGuard } from "src/modules/users/guards/user-status.guard";
import { DeleteDocDto } from "./dto/delete-doc.dto";
import DeleteDocumentUseCase from "../application/use-cases/delete-doc.usecase";
import ListDocumentUseCase from "../application/use-cases/list-documents.usecase";
import { CurrentUser } from "@/common/decorators/current-user.decorator";
import RetryDocUseCase from "../application/use-cases/retry-doc.usecase";

@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard, UserStatusGuard)
class DocumentController {
    constructor(
        private readonly uploadDoc: UploadDocumentUseCase,
        private readonly deleteDoc: DeleteDocumentUseCase,
        private readonly listDocs: ListDocumentUseCase,
        private readonly retryDocumentUseCase: RetryDocUseCase,
    ) { }

    @Get('workspace/:workspaceId/documents')
    async list(
        @Param('workspaceId') workspaceId: string,
        @CurrentUser() user: {id: string},
    ) {
        return this.listDocs.execute({
            workspaceId,
            requesterId: user.id,
        });
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(
        @UploadedFile() file: Express.Multer.File,
        @Req() req,
        @Body() dto: UploadDocDto,
    ) {
        return this.uploadDoc.execute({
            workspaceId: dto.workspaceId,
            userId: req.user.id,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            buffer: file.buffer,
        })
    } 
    
    @Delete('remove')
    async delete(
        @Req() req,
        @Body() dto: DeleteDocDto,
    ) {
        return this.deleteDoc.execute({
            documentId: dto.documentId,
            userId: req.user.id
        })
    }

    @Post('/workspaces/:workspaceId/documents/:id/retry')
    async retry(
        @Param('workspaceId') workspaceId: string,
        @Param('id') documentId: string,
        @CurrentUser() user: { id: string },
    ) {
        await this.retryDocumentUseCase.execute({
            workspaceId,
            documentId,
            requesterId: user.id,
        });
        return { ok: true };
    }

}

export default DocumentController;