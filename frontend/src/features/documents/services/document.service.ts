import api from "@/lib/api";
import { Document } from "../types";


export const documentService = {
    list(workspaceId: string) {
        return api.get<Document[]>(
            `/workspaces/${workspaceId}/documents`
        );
    },

    upload(workspaceId: string, file: File) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('workspaceId', workspaceId);

        return api.post(
            `/workspaces/${workspaceId}/documents/upload`,
            formData,
        )
    },

    remove(workspaceId: string, documentId: string) {
        return api.delete(
            `/workspaces/${workspaceId}/documents/${documentId}`
        )
    },

    retry(workspaceId: string, documentId: string) {
        return api.post(
            `/workspaces/${workspaceId}/documents/${documentId}/retry`
        )
    }
};