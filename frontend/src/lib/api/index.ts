import { useAuthStore } from '@/store/auth.store';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    res => res,
    async (err) => {
        if (err.response?.status === 401) {
            try {
                const res = await api.post('/auth/refresh',
                    {}, 
                    { withCredentials: true });

                const { accessToken } = res.data;
                useAuthStore.getState().setAccessToken(accessToken);
                    
                err.config.headers.Authorization = `Bearer ${accessToken}`;
                return api.request(err.config);
            } catch {
                useAuthStore.getState().logout();
                window.location.href = '/';
            }
        }

        return Promise.reject(err);
    }
)
export default api;