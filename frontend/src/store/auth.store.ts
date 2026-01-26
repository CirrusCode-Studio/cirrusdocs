import { create } from 'zustand'

type AuthState = {
  accessToken: string | null
  isAuthenticated: boolean
  isHydrated?: boolean
  setAccessToken: (token: string | null) => void
  logout: () => void
  markHydrated: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    isAuthenticated: false,
    isHydrated: false,
    setAccessToken: (token) =>
        set({
            accessToken: token,
            isAuthenticated: !!token,
        }),

    logout: () =>
        set({
            accessToken: null,
            isAuthenticated: false,
        }),
    markHydrated: () =>
        set({
            isHydrated: true,
        }),
}))
