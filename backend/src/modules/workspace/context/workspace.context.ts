import { WorkspaceRole } from "@prisma/client";

export interface WorkspaceContext {
    workspaceId: string;
    role: WorkspaceRole;
}