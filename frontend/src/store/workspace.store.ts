import { create } from "zustand";
import { persist } from "zustand/middleware";

type WorkspaceState = {
    activeWorkspaceId: string | null;
    setActiveWorkspaceId: (id: string) => void;
    reset: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
    persist(
        (set) => ({
            activeWorkspaceId: null,

            setActiveWorkspaceId: (id: string) => set(() => ({
                activeWorkspaceId: id,
            })),

            reset: () => set(() => ({
                activeWorkspaceId: null,
            })),
        }),
        {
            name: 'workspace-store',
            partialize: (s) => ({ activeWorkspaceId: s.activeWorkspaceId }),
        }
    )
);