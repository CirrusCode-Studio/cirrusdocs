import { useWorkspaceStore } from "@/store/workspace.store";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { documentService } from "../services/document.service";
import { Document } from "../types";

export const useDeleteDoc = () => {
    const qc = useQueryClient();
    const workspaceId = useWorkspaceStore((s) => s.activeWorkspaceId);

    return useMutation({
        mutationFn: (docId: string) => { 
            if (!workspaceId)
                throw new Error("No active workspace");
            return documentService.remove(workspaceId, docId)
        
        },
        onSuccess: (_, documentId) => {
            qc.setQueryData(
                ['documents', workspaceId],
                (old: Document[] = []) => old?.filter(doc => doc.id !== documentId)
            );
        },
    });
}