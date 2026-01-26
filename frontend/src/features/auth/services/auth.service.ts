import api from "@/lib/api"

type AuthPayload = {
    email: string;
    password: string;
}

export const authService = {
    login(payload: AuthPayload) {
        return api.post('/auth/login', payload);
    },
    
    refresh(refreshToken: string) {
        return api.post('/auth/refresh', { refreshToken });
    },

    me() {
        return api.get('/auth/me');
    },

    logout() {
        return api.post('/auth/logout');
    }
}