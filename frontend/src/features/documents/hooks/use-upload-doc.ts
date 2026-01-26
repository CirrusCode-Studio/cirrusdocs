import { useWorkspaceStore } from "@/store/workspace.store";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { documentService } from "../services/document.service";

export const useUploadDocument = () => {
    const qc = useQueryClient();
    const workspaceId = useWorkspaceStore((s) => s.activeWorkspaceId);

    return useMutation({
        mutationFn: (file: File) => {
            if (!workspaceId)
                throw new Error("No active workspace");
            // TODO: Implement file upload logic
            return documentService.upload(workspaceId, file);
        },

        onSuccess: (res) => {
            const newDoc: Document = res.data;
            qc.setQueryData(
                ['documents', workspaceId],
                (old: Document[] = []) => [newDoc, ...old]
            );
        }
    });
};