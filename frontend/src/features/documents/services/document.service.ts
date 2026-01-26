import api from "@/lib/api";
import { Document } from "../types";


export const documentService = {
    async list(workspaceId: string): Promise<Document[]> {
        const res = await api.get<Document[]>(
            `/workspaces/${workspaceId}/documents`
        );
        return res.data;
    },

    async upload(workspaceId: string, file: File) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('workspaceId', workspaceId);

        return await api.post(
            `/workspaces/${workspaceId}/documents/upload`,
            formData,
        )
    },

    async remove(workspaceId: string, documentId: string) {
        return await api.delete(
            `/workspaces/${workspaceId}/documents/${documentId}`
        )
    },

    async retry(workspaceId: string, documentId: string) {
        return await api.post(
            `/workspaces/${workspaceId}/documents/${documentId}/retry`
        )
    }
};