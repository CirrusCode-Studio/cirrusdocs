import { CreateWSDto } from './dto/create-workspace.dto';
import { PrismaService } from "src/prisma/prisma.service";
import { InviteMemberDto } from './dto/invite-member.dto';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';
import { RemoveMemberDto } from './dto/remove-member.dto';

@Injectable()
class WorkspaceService {
    constructor(private prisma: PrismaService) {}

    async createPersonalWorkspace(userId: string, prisma: PrismaClient = this.prisma) {
        return prisma.workspace.create({
            data: {
                name: 'Personal Workspace',
                slug: `personal-${userId}`,
                ownerId: userId,
                members: {
                    create: {
                        userId: userId,
                        role: 'OWNER',
                    }
                }
            },
        });
    }

    async createWorkspace(userId: string, dto: CreateWSDto) {
        return this.prisma.workspace.create({
            data: {
                name: dto.name,
                slug: crypto.randomUUID(),
                ownerId: userId,
                members: {
                    create: {
                        userId: userId,
                        role: 'OWNER'
                    }
                }
            }
        })
    }

    async getPersonalWorkspace(userId: string) {
        return this.prisma.workspace.findFirst({
            where: {
                ownerId: userId
            }
        })
    }

    async listUserWorkspaces(userId: string) {
        return this.prisma.workspace.findMany({
            where: {
                members: {
                    some: {
                        userId: userId,
                    }
                }
            }
        })
    }

    async addMemberToWorkspace(workspaceId: string, dto: InviteMemberDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const existingMember = await this.prisma.workspaceMember.findFirst({
            where: {
                workspaceId: workspaceId,
                userId: user.id,
            }
        });

        if (existingMember) {
            throw new NotFoundException('User is already a member of the workspace');
        }

        return this.prisma.workspaceMember.create({
            data: {
                workspaceId: workspaceId,
                userId: user.id,
                role: dto.role,
            }
        })
    }

    async removeMemberFromWorkspace(
        workspaceId: string,
        dto: RemoveMemberDto,
    ) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
            select: { id: true },
        })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const member = await this.prisma.workspaceMember.findUnique({
            where: {
            workspaceId_userId: {
                workspaceId,
                userId: user.id,
            },
            },
        })

        if (!member) {
            throw new ForbiddenException('User is not in workspace')
        }

        return this.prisma.workspaceMember.delete({
            where: {
                workspaceId_userId: {
                    workspaceId,
                    userId: user.id,
                },
            },
        })
    }

} 

export { WorkspaceService};