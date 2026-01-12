import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Get, Controller, UseGuards, Patch, Body, Delete } from "@nestjs/common";
import { RolesGuard } from "./guards/roles.guard";
import { UserStatusGuard } from "./guards/user-status.guard";
import { UpdateMeDto } from "./dto/update-me.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import * as AuthTypes from '../auth/interfaces/auth-user.interface';
import { UsersService } from "./users.service";

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard, UserStatusGuard)
class UsersController {
    constructor(private readonly usersService: UsersService){}

    // ===== USER =====
    @Get('me')
    getMe(@CurrentUser() user : AuthTypes.AuthUser) {
        return this.usersService.findById(user.id);
    }

    @Patch('me')
    updateMe(
        @CurrentUser() user: AuthTypes.AuthUser,
        @Body() dto: UpdateMeDto,
    ) {
        return this.usersService.update(user.id, dto)
    }

    @Delete('me')
    deactivateMe(@CurrentUser() user: AuthTypes.AuthUser) {
        return this.usersService.deactivate(user.id);
    }
}

export { UsersController };