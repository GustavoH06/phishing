import api, { testBackendConnection } from './api';

class AuthService {
    async login(name, password) {
        try {
            const connectionOk = await testBackendConnection();
            if (!connectionOk) {
                return { 
                    success: false, 
                    error: 'Não foi possível conectar com o servidor' 
                };
            }

            const formData = new FormData();
            formData.append('name', name);
            formData.append('password', password);

            const response = await api.post('/auth/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                
                try {
                    const userInfo = await this.getUserInfo();
                    localStorage.setItem('user', JSON.stringify(userInfo));
                    return { success: true, user: userInfo };
                } catch (userError) {
                    return { success: true, user: null };
                }
            } else {
                return { 
                    success: false, 
                    error: 'Resposta inválida do servidor' 
                };
            }
        } catch (error) {
            let errorMessage = 'Erro ao fazer login';
            
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Usuário ou senha incorretos';
                } else if (error.response.status === 500) {
                    errorMessage = 'Erro interno do servidor';
                } else {
                    errorMessage = error.response.data?.message || `Erro ${error.response.status}`;
                }
            } else if (error.request) {
                errorMessage = 'Não foi possível conectar com o servidor';
            } else {
                errorMessage = error.message || 'Erro desconhecido';
            }
            
            return { 
                success: false, 
                error: errorMessage 
            };
        }
    }

    async getUserInfo() {
        const response = await api.get('/auth/');
        return response.data;
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    isAdmin() {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                return JSON.parse(user).is_admin || false;
            } catch {
                return false;
            }
        }
        return false;
    }

    getCurrentUser() {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                return JSON.parse(user);
            } catch {
                return null;
            }
        }
        return null;
    }
}

export default new AuthService();