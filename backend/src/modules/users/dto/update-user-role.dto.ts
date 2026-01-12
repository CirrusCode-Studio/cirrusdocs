import { UserRole } from "../enums/user-role.enum";
import { IsEnum } from "class-validator";

export class UpdateUserRoleDto {
    @IsEnum(UserRole)
    role: UserRole;
}