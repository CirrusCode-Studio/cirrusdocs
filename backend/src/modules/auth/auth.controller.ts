import { Body, Controller, Post, Ip, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh-token.dto';
import { LoginRateLimitGuard } from './guards/login-rate-limit.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { LogoutDto } from './dto/logout.dto';

@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) {}

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.auth.register(dto.email, dto.password);
    }

    @Post('login')
    @UseGuards(LoginRateLimitGuard)
    login(@Body() dto: LoginDto, @Ip() ip: string) {
        return this.auth.login(dto.email, dto.password, ip);
    }

    @Post('refresh')
    refresh(@Body() dto: RefreshDto) {
        return this.auth.refresh(dto.refreshToken);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    logout(@Body() dto: LogoutDto,
        @Req() req
    ) {
        return this.auth.logout(req.user.id, dto.refreshToken);
    }
}
