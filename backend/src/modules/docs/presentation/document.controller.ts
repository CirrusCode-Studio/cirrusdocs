import { Controller, Post, UploadedFile, UseInterceptors, Body, UseGuards, Req, Delete } from "@nestjs/common";
import UploadDocumentUseCase from "../application/use-cases/upload-doc.usecase";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadDocDto } from "./dto/upload-doc.dto";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/modules/users/guards/roles.guard";
import { UserStatusGuard } from "src/modules/users/guards/user-status.guard";
import { DeleteDocDto } from "./dto/delete-doc.dto";
import DeleteDocumentUseCase from "../application/use-cases/delete-doc.usecase";

@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard, UserStatusGuard)
class DocumentController {
    constructor(
        private readonly uploadDoc: UploadDocumentUseCase,
        private readonly deleteDoc: DeleteDocumentUseCase,
    ) { }

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
}

export default DocumentController;