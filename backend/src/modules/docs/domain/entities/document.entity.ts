import { DocumentStatus, StorageProvider } from "@prisma/client";

interface DocumentProps {
    id: string;
    workspaceId: string;
    ownerId: string;

    originalName: string;
    storedName: string;
    mimeType: string;
    size: bigint;
    storagePath: string;
    extension: string | null;

    status: DocumentStatus;
    errorMessage?: string | null;

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}

class Document {
    private props: DocumentProps;

    constructor(props: DocumentProps) {
        this.props = props;
    }

    get id() { return this.props.id; }
    get workspaceId() { return this.props.workspaceId; }
    get ownerId() { return this.props.ownerId; }
    get status() { return this.props.status; }
    get storagePath() { return this.props.storagePath; }
    get originalName() { return this.props.originalName; }
    get extension() { return this.props.extension; }
    get mimeType() { return this.props.mimeType; }
    get size() { return this.props.size; }
    get storedName() { return this.props.storedName; }
    get deletedAt() { return this.props.deletedAt; }
    /* ======== Business Behavior ========*/

    markProcessing() {
        if (this.props.status !== DocumentStatus.UPLOADED) {
            throw new Error('Document cannot mark processing');
        }
        this.props.status = DocumentStatus.PROCESSING;
    }

    markReady() {
        if (this.props.status !== DocumentStatus.PROCESSING) {
            throw new Error('Document cannot mark ready');
        }
        this.props.status = DocumentStatus.READY;
    }

    markFailed(reason: string) {
        this.props.status = DocumentStatus.FAILED;
        this.props.errorMessage = reason;
    }

    markRetry() {
        this.props.status = DocumentStatus.UPLOADED;
    }
    canRetry(): boolean {
        return this.props.status === DocumentStatus.FAILED;
    }

    softDetele() {
        this.props.status = DocumentStatus.DELETED;
        this.props.deletedAt = new Date();
    }

    canBeViewedBy(userId: string): boolean {
        return this.props.ownerId === userId;
    }

    canBeRetriedBy(userId: string): boolean {
        return this.canRetry() && this.props.ownerId === userId;
    }
    
    toPrimitives() {
        return {...this.props};
    }
}

export { Document }