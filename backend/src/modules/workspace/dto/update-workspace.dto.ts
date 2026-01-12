import { IsOptional, IsString, Length } from "class-validator";

export class UpdateWSDto {
    @IsOptional()
    @IsString()
    @Length(3, 50)
    name?: string;
}