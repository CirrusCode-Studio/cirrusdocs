// decorators/workspace-id.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const WorkspaceId = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest()
        return req.workspace?.workspaceId
    },
)
