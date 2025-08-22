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

  // Test users data
  const testUsers = [
    {
      email: 'admin',
      password: 'adminalpha',
      role: 'admin',
      name: 'Administrator'
    },
    {
      email: 'user1',
      password: 'user123',
      role: 'user',
      name: 'Test User 1'
    },
    {
      email: 'user2',
      password: 'user456',
      role: 'user',
      name: 'Test User 2'
    },
    {
      email: 'moderator',
      password: 'mod789',
      role: 'moderator',
      name: 'Moderator'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check for test user credentials
    const user = testUsers.find(u => 
      u.email === formData.email && u.password === formData.password
    );

    if (user) {
      // Store auth state (in a real app, you'd store a JWT token)
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ 
        email: user.email, 
        role: user.role,
        name: user.name
      }));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try: admin/adminalpha, user1/user123, user2/user456, or moderator/mod789');
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

      {/* Test Users Section - Always Visible */}
      <div className="test-users-section">
        <h3 className="test-users-title">👥 Usuarios de Prueba</h3>
        <div className="test-users-grid">
          {testUsers.map((user, index) => (
            <div 
              key={index} 
              className="test-user-card"
              onClick={() => {
                setFormData({
                  email: user.email,
                  password: user.password
                });
                setError('');
              }}
            >
              <div className="test-user-role">{user.role}</div>
              <div className="test-user-name">{user.name}</div>
              <div className="test-user-credentials">
                <span className="test-user-username">{user.email}</span>
                <span className="test-user-password">{user.password}</span>
              </div>
              <div className="test-user-click">Click para usar</div>
            </div>
          ))}
        </div>
      </div>

      <div className="auth-footer">
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
        <p><a href="/forgot-password">Forgot password?</a></p>
      </div>
    </div>
  );
};

export default LoginForm;


