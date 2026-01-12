import { SetMetadata } from "@nestjs/common";
import { WorkspaceRole } from "@prisma/client";

export const WORKSPACE_ROLE_KEY = "WORKSPACE_ROLE";

export const RequireWorkspaceRole = (...role: WorkspaceRole[]) => 
    SetMetadata(WORKSPACE_ROLE_KEY, role);