import { AuthUser } from "src/modules/auth/interfaces/auth-user.interface";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

const CurrentUser = createParamDecorator(
    (data: keyof AuthUser | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user: AuthUser = request.user;

        return data ? user?.[data] : user;
    }
); 

export { CurrentUser };