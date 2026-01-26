import { useAuthStore } from "@/store/auth.store";
import { authService } from "../services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
    const setAccessToken = useAuthStore((s) => s.setAccessToken);

    return useMutation({
        mutationFn: authService.login,
        onSuccess: (res) => {
            const { accessToken } = res.data;
            setAccessToken(accessToken);
        }
    })
}

export const useRegister = () => {
    const setTokens = useAuthStore((s) => s.setAccessToken);

    return useMutation({
        mutationFn: authService.register,
        onSuccess: (res) => {
            const { accessToken } = res.data;
            setTokens(accessToken);
        }
    })
}

export const useLogout = () => {
    const logout = useAuthStore((s) => s.logout);

    return useMutation({
        mutationFn: authService.logout,
        onSettled: () => {
            logout();
        }
    })
}