import { UserStatus } from '../enums/user-status.enum';

export class UserResponseDto {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    role: string;
    status: UserStatus;
    createdAt: Date;
}