import { workspaceService } from './../services/workspace.service';
import { useQuery } from "@tanstack/react-query";

export const useWorkspace = () => {
    return useQuery({
        queryKey: ['workspaces'],
        queryFn: workspaceService.list,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}