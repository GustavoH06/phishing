import axios from 'axios';

const getBaseURL = () => {
    console.log('📍 Debug - Frontend URL:', window.location.origin);
    
    const frontendUrl = window.location.origin;
    
    // Verifica se está no Codespaces (.app.github.dev ou .preview.app.github.dev)
    if (frontendUrl.includes('.app.github.dev') || frontendUrl.includes('.preview.app.github.dev')) {
        // Extrai o nome base do codespace
        const baseCodespaceName = frontendUrl.replace('-5173.app.github.dev', '')
                                           .replace('-5173.preview.app.github.dev', '')
                                           .replace('https://', '');
        
        // Constrói a URL do backend
        const backendUrl = `https://${baseCodespaceName}-5000.app.github.dev`;
        console.log('📍 Debug - Backend URL calculada:', backendUrl);
        
        return `${backendUrl}/api/v1`;
    }
    
    // Desenvolvimento local
    return 'http://localhost:5000/api/v1';
};

const baseURL = getBaseURL();
console.log('🎯 API Base URL final:', baseURL);

const api = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export const testBackendConnection = async () => {
    try {
        const response = await api.get('/auth/');
        return true;
    } catch (error) {
        console.error('❌ Erro na conexão com backend:', error);
        return false;
    }
};

export default api;