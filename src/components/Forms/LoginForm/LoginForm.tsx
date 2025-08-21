import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './LoginForm.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Credenciales inválidas. Por favor, intenta de nuevo.');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-card">
        <div className="login-header">
          <h2>Iniciar Sesión</h2>
          <p>Accede a tu cuenta Alpha</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                Iniciando sesión...
              </div>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>¿No tienes cuenta? <a href="/signup">Regístrate aquí</a></p>
        </div>

        <div className="demo-credentials">
          <h4>Credenciales de Demo:</h4>
          <div className="credential-item">
            <strong>Admin:</strong> admin@alpha.com / admin123
          </div>
          <div className="credential-item">
            <strong>Usuario:</strong> user@alpha.com / user123
          </div>
          <div className="credential-item">
            <strong>Test:</strong> test@alpha.com / test123
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;


