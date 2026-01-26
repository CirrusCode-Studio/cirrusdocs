import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";
import { authService } from "../services/auth.service";

export const useAutoLogin = () => {
    const setAccessToken = useAuthStore((s) => s.setAccessToken);
    const logout = useAuthStore((s) => s.logout);
    const markHydrated = useAuthStore((s) => s.markHydrated);

    useEffect(() => {
        authService.me()
            .then((res) => {
                const { accessToken } = res.data;
                setAccessToken(accessToken);
            })
            .catch(() => {
                logout();
            })
            .finally(() => {
                markHydrated();
            });
    }, []);
}