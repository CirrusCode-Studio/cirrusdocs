import { IsEmail } from "class-validator";

export class RemoveMemberDto {
    @IsEmail()
    email: string;
}