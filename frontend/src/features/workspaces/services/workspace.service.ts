import api from "@/lib/api";

export const workspaceService = {
    list: async () => {
        const response = await api.get('/api/workspaces');
        return response.data;
    }
}