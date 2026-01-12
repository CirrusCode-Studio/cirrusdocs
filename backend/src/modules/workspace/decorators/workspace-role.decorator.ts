// decorators/workspace-role.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const WorkspaceRole = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest()
        return req.workspace?.role
    },
)
