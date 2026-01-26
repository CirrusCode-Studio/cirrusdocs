import { useQuery } from "@tanstack/react-query";
import { documentService } from "../services/document.service";
import { useWorkspaceStore } from "@/store/workspace.store";

const useDocumentData = () => {
	const workspaceId = useWorkspaceStore((s) => s.activeWorkspaceId);

	return useQuery({
		queryKey: ['documents', workspaceId],
		enabled: !!workspaceId,
		queryFn: () => documentService.list(workspaceId!),
	});
}

export { useDocumentData }