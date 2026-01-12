import { IsNotEmpty } from "class-validator";

export class DeleteDocDto {
    @IsNotEmpty()
    documentId: string;
}