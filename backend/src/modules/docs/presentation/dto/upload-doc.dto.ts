import { IsNotEmpty } from "class-validator";

export class UploadDocDto {
    @IsNotEmpty()
    workspaceId: string;
}