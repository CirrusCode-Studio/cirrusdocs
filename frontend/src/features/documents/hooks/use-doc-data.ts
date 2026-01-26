import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { documentService } from "../services/document.service";

const useDocumentData = (workspaceId: string) => {
	const query = useQueryClient();

	const listQuery = useQuery({
		queryKey: ['documents', workspaceId],
		queryFn: async () => 
			documentService.list(workspaceId).then(res => res.data),
	});

	const deleteMutation = useMutation({
		mutationFn: (documentId: string) => 
			documentService.remove(workspaceId, documentId),
		onSuccess: () => {
			query.invalidateQueries({ queryKey: ['documents', workspaceId] });
		}
	});

	const retryMutation = useMutation({
		mutationFn: (documentId: string) => 
			documentService.retry(workspaceId, documentId),
		onSuccess: () => {
			query.invalidateQueries({ queryKey: ['documents', workspaceId] });
		}
	})

	return {
		documents: listQuery.data ?? [],
		isLoading: listQuery.isLoading,
		error: listQuery.error,

		deleteDoc: deleteMutation.mutate,
		retryDoc: retryMutation.mutate,

		refetch: listQuery.refetch,
	}
}

export { useDocumentData }