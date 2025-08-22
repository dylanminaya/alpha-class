import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check for admin credentials
    if (formData.email === 'admin' && formData.password === 'adminalpha') {
      // Store auth state (in a real app, you'd store a JWT token)
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ 
        email: 'admin', 
        role: 'admin',
        name: 'Administrator'
      }));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use admin/adminalpha to login.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="brand">Alpha Class</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="email">Username or Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your username or email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>

        <button 
          type="submit" 
          className="btn primary"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="auth-footer">
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
        <p><a href="/forgot-password">Forgot password?</a></p>
      </div>
    </div>
  );
};

export default LoginForm;


