import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { USER_PUBLIC_SELECT } from "./constants/user-select.const";
import { QueryUsersDto } from "./dto/query-users.dto";
import { UpdateMeDto } from "./dto/update-me.dto";
import { UserStatus } from "@prisma/client";
import { UserRole } from "./enums/user-role.enum";

@Injectable()
class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    // ===============================
    // CORE QUERIES
    // ===============================

    async findById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {id},
            select: USER_PUBLIC_SELECT
        })

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findAll(query: QueryUsersDto) {
        const { role, status } = query;

        return this.prisma.user.findMany({
            where: {
                role,
                status,
            },
            select: USER_PUBLIC_SELECT,
            orderBy: { 
                createdAt: 'desc' 
            },
        });
    }

    // ===============================
    // USER SELF-SERVICE
    // ===============================

    async update(userId: string, dto: UpdateMeDto) {
        if (!dto || Object.keys(dto).length === 0) {
            throw new BadRequestException('No data provided for update');
        }

        return this.prisma.user.update({
            where: { id: userId },
            data: dto,
            select: USER_PUBLIC_SELECT,
        });
    }

    async deactivate(userId: string) {
        await this.prisma.user.update({
        where: { id: userId },
        data: {
            status: UserStatus.SUSPENDED,
        },
        });
    }

    // ===============================
    // ADMIN ACTIONS
    // ===============================

    async updateStatus(userId: string, status: UserStatus) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { status },
            select: USER_PUBLIC_SELECT,
        });
    }

    async updateRole(userId: string, role: UserRole) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { role },
            select: USER_PUBLIC_SELECT,
        });
    }

    // ===============================
    // INTERNAL (FOR OTHER MODULES)
    // ===============================

    async checkUserActive(userId: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { status: true },
        });

        return user?.status === UserStatus.ACTIVE;
    }

    async getUserContext(userId: string) {
        const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            role: true,
            status: true,
        },
        });

        if (!user) {
        throw new NotFoundException('User not found');
        }

        return user;
    }
}

export { UsersService };