import { Controller, Get, UseGuards, Post, Req, Body, Param, Delete } from "@nestjs/common";
import { WorkspaceService } from "./workspace.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { WorkspaceGuard } from "./guards/workspace.guard";
import { CreateWSDto } from "./dto/create-workspace.dto";
import { RequireWorkspaceRole } from "./decorators/require-workspace-role.decorator";
import { InviteMemberDto } from "./dto/invite-member.dto";
import { RemoveMemberDto } from "./dto/remove-member.dto";

@UseGuards(JwtAuthGuard)
@Controller('workspace')
class WorkspaceController {
    constructor(private workspaceService: WorkspaceService) {}

    @Post()
    async create(@Req() req, @Body() dto: CreateWSDto) {
        return this.workspaceService.createWorkspace(req.user.id, dto);
    }

    @Get('my')
    async myWorkspaces(@Req() req) {
        return this.workspaceService.getPersonalWorkspace(req.user.id);
    }

    @UseGuards(WorkspaceGuard)
    @RequireWorkspaceRole('OWNER', 'ADMIN')
    @Post(':id/members')
    async addMember(
        @Param('id') workspaceId: string,
        @Body() dto: InviteMemberDto,

    ) {
        return this.workspaceService.addMemberToWorkspace(workspaceId, dto);
    }

    @UseGuards(WorkspaceGuard)
    @RequireWorkspaceRole('OWNER', 'ADMIN')
    @Delete(':id/members')
    async removeMember(
        @Param('id') workspaceId: string,
        @Body() dto: RemoveMemberDto,
    ) {
        return this.workspaceService.removeMemberFromWorkspace(workspaceId, dto);
    }
}

export { WorkspaceController };