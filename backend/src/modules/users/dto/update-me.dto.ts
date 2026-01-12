import { IsString, IsOptional, IsUrl, Length } from "class-validator";

export class UpdateMeDto {
    @IsOptional()
    @IsString()
    @Length(2, 50)
    name?: string;

    @IsOptional()
    @IsUrl()
    avatar?: string;
}