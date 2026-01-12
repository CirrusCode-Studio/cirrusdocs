import { UserRole } from "src/modules/users/enums/user-role.enum";
import { UserStatus } from "src/modules/users/enums/user-status.enum";

export interface JwtPayload {
    sub: string;
    email: string;
    role: UserRole;
    status: UserStatus;
}