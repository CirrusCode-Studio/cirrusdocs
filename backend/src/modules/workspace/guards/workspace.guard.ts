import { PrismaService } from 'src/prisma/prisma.service';
import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { WorkspaceRole } from '@prisma/client';

@Injectable()
class WorkspaceGuard implements CanActivate {
    constructor(
        private readonly prisma: PrismaService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const userId = req.user?.id;
        const workspaceId = req.headers['x-workspace-id'];

        if (!workspaceId) {
            throw new ForbiddenException('Workspace Context Missing');
        }

        const member = await this.prisma.workspaceMember.findFirst({
            where: {
                workspaceId: workspaceId,
                userId: userId,
            },
        });
        
        if (!member) {
            throw new ForbiddenException('User is not a member of the workspace');
        }
        req.workspace = {
            workspaceId: workspaceId,
            role: member.role,
        }

        const requiredRoles = this.reflector.getAllAndOverride<WorkspaceRole[]>('WORKSPACE_ROLE', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (requiredRoles && !requiredRoles.includes(member.role)) {
            throw new ForbiddenException('Insufficient workspace role');
        }

        return true;
    }
}

export { WorkspaceGuard };