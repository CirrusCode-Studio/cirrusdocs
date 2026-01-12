import { IsEnum, IsOptional } from "class-validator";
import { UserRole } from "../enums/user-role.enum";
import { UserStatus } from "@prisma/client";

export class QueryUsersDto {
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus;
}