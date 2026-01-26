export class DocItemDto {
    id: string;
    name: string;
    type: 'file' | 'folder';
    parentId?: string;
    createdAt: Date;
    updatedAt: Date;
}