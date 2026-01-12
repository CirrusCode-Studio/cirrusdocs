import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserStatus } from "../enums/user-status.enum";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
class UserStatusGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const { user } = context.switchToHttp().getRequest();

        if (!user) {
            throw new UnauthorizedException();
        }
        
        if (user.status !== UserStatus.ACTIVE) {
            throw new ForbiddenException('User is not active');
        }

        return true;
    }
}

export { UserStatusGuard };