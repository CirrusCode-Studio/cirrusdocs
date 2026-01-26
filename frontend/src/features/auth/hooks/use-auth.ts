import { useAuthStore } from "@/store/auth.store";
import { authService } from "../services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
    const setTokens = useAuthStore((s) => s.setToken);

    return useMutation({
        mutationFn: authService.login,
        onSuccess: (res) => {
            const { accessToken, refreshToken} = res.data;
            setTokens(accessToken, refreshToken);
        }
    })
}