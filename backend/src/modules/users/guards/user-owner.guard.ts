import { 
    Injectable, 
    CanActivate, 
    ExecutionContext, 
    ForbiddenException
 } from "@nestjs/common";

@Injectable()
class UserOwnerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const targetUserId = request.params.id;

        if (user.id !== targetUserId && user.role !== 'ADMIN') {
            throw new ForbiddenException('Access deinied');
        }

        return true;
    }
}

export { UserOwnerGuard };