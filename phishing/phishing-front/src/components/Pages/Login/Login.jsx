import React, { useState, useEffect } from 'react';
import { authService } from '/workspaces/phishing/phishing/phishing-front/src/components/services/authService.js';
import './login.css';

const LoginAdmin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const userData = await authService.getCurrentUser();
          setUserInfo(userData);
          setDebugInfo('Usuário já autenticado');
        } catch (err) {
          console.error('Erro ao verificar autenticação:', err);
          authService.removeToken();
          setDebugInfo('Token inválido, fazendo logout...');
        }
      } else {
        setDebugInfo('Nenhum usuário autenticado');
      }
    };

    checkAuth();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDebugInfo('Iniciando processo de login...');

    try {
      setDebugInfo('Enviando credenciais para o servidor...');
      const response = await authService.login(formData.username, formData.password);
      
      setDebugInfo('Salvando token de autenticação...');
      authService.setToken(response.access_token);
      
      setDebugInfo('Buscando informações do usuário...');
      const userData = await authService.getCurrentUser();
      setUserInfo(userData);
      
      setDebugInfo('Login realizado com sucesso!');
      setError('Login realizado com sucesso!');
      
    } catch (err) {
      const errorMsg = err.message || 'Erro desconhecido';
      setError(`Erro${errorMsg}`);
      setDebugInfo(`Falha no login: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
  };

  const redirectToAdmin = () => {
    window.location.href = '/admin';
  };

  const redirectToHome = () => {
    window.location.href = '/';
  };

  if (userInfo) {
    return (
      <div className="login-admin-container">
        <div className="login-admin-card">
          <div className="header">
            <h2>Login</h2>
          </div>

          <div className="actions-section">
            {userInfo.is_admin && (
              <button 
                onClick={redirectToAdmin}
                className="btn btn-primary"
              >
                Acessar Painel Admin Completo
              </button>
            )}
            
            <button 
              onClick={redirectToHome}
              className="btn btn-secondary"
            >
              Ir para Página Inicial
            </button>

            <button 
              onClick={handleLogout}
              className="btn btn-danger"
            >
             Sair do Sistema
            </button>
          </div>

          {debugInfo && (
            <div className="debug-info">
              <h4>Informações de Debug:</h4>
              <pre>{debugInfo}</pre>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="login-admin-container">
      <div className="login-admin-card">
        <div className="header">
          <h2>Login</h2>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Usuário
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="usuario"
              required
              disabled={loading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="senha"
              required
              disabled={loading}
              className="form-input"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`btn btn-primary login-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Processando...
              </>
            ) : (
              'Entrar no Sistema'
            )}
          </button>
        </form>

        {error && (
          <div className={`alert ${error.includes('Sucesso') ? 'alert-success' : 'alert-error'}`}>
            {error}
          </div>
        )}

        {debugInfo && (
          <div className="debug-info">
            <h4>Debug Info:</h4>
            <pre>{debugInfo}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginAdmin;