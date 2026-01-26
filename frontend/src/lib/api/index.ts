import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    withCredentials: true,
});

api.interceptors.response.use(
    res => res,
    err => {
        // Global error handling
        if (err.response) {
            console.error('API Error:', err.response.status, err.response.data);
        } else {
            console.error('API Error:', err.message);
        }
        return Promise.reject(err);
    }
)

export default api;