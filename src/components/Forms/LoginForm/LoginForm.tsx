import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
  error?: string;
}

const LoginForm = ({ onSubmit, isLoading = false, error }: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-header">
        <div className="login-logo">
          <span className="logo-text">TrackIt</span>
        </div>
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to your TrackIt account</p>
        
        
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="Enter your email"
            autoComplete="email"
            disabled={isLoading}
          />
          {errors.email && (
            <span className="field-error">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input password-input ${errors.password ? 'error' : ''}`}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isLoading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.password && (
            <span className="field-error">{errors.password}</span>
          )}
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="checkbox-input"
              disabled={isLoading}
            />
            <span className="checkbox-text">Remember me</span>
          </label>
        </div>

        <button
          type="submit"
          className="form-submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading-spinner"></span>
          ) : (
            'Sign In'
          )}
        </button>

        <div className="form-links">
          <Link to="/forgot-password" className="forgot-link">
            Forgot your password?
          </Link>
        </div>

        <div className="form-footer">
          <p className="signup-prompt">
            Don't have an account?{' '}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
