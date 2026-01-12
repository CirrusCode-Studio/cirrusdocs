import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Controller, Body, Param, Get, Query, Patch, UseGuards } from "@nestjs/common";
import { Roles } from "./decorators/roles.decorator";
import { UserRole } from "./enums/user-role.enum";
import { QueryUsersDto } from "./dto/query-users.dto";
import { UpdateUserStatusDto } from "./dto/update-user-status.dto";
import { UpdateUserRoleDto } from "./dto/update-user-role.dto";
import { RolesGuard } from "./guards/roles.guard";
import { UsersService } from "./users.service";

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
class AdminUsersController {
    constructor(private readonly usersService: UsersService) {}

    // ===== ADMIN =====
    @Get()
    @Roles(UserRole.ADMIN)
    findAll(@Query() query: QueryUsersDto) {
        return this.usersService.findAll(query);
    }

    @Get(':id')
    @Roles(UserRole.ADMIN)
    findOne(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @Patch(':id/status')
    @Roles(UserRole.ADMIN)
    updateStatus(
        @Param('id') id: string,
        @Body() dto: UpdateUserStatusDto,
    ) {
        return this.usersService.updateStatus(id, dto.status);
    }

    @Patch(':id/role')
    @Roles(UserRole.ADMIN)
    updateRole(
        @Param('id') id: string,
        @Body() dto: UpdateUserRoleDto,
    ) {
        return this.usersService.updateRole(id, dto.role);
    }
}

export { AdminUsersController };