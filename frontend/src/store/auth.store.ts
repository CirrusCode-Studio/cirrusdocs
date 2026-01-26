import { persist } from "zustand/middleware";
import { create } from "zustand";

type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;

    setToken: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            setToken: (accessToken, refreshToken) => set(() => ({
                accessToken,
                refreshToken,
                isAuthenticated: true,
            })),

            logout: () => set(() => ({
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
            })),
        }),
        { name: 'auth-store'}
    )
);