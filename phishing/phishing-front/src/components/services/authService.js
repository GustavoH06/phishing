import api, { getAuthHeaders } from './api';

export const authService = {
  async login(username, password) {
    console.log('Iniciando processo de login...');
    
    try {
      const formData = new URLSearchParams();
      formData.append('name', username);
      formData.append('password', password);

      console.log('Enviando requisição para:', api.defaults.baseURL + '/auth/');
      
      const response = await api.post('/auth/', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      console.log('Login realizado com sucesso!');
      return response.data;
      
    } catch (error) {
      console.error('Erro no login:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.auth || 
                          'Erro de conexão com o servidor';
      
      throw new Error(errorMessage);
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/', {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter usuário atual:', error);
      throw error;
    }
  },

  setToken(token) {
    localStorage.setItem('jwt_token', token);
    console.log('Token salvo no localStorage');
  },

  getToken() {
    return localStorage.getItem('jwt_token');
  },

  removeToken() {
    localStorage.removeItem('jwt_token');
    console.log('Token removido do localStorage');
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  logout() {
    this.removeToken();
    window.location.href = '/login';
  }
};