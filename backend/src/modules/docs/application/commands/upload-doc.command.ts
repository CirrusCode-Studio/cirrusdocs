import { WorkspacePlan } from "@prisma/client";

export class UploadDocCommand {
    constructor(
        public readonly workspaceId: string,
        public readonly userId: string,
        public readonly originalName: string,
        public readonly mimeType: string,
        public readonly size: number,
        public readonly buffer: Buffer,
    ) {}
}
