import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const emailPattern = /^(?:[a-zA-Z0-9_'^&+%\-]+(?:\.[a-zA-Z0-9_'^&+%\-]+)*)@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}$/;

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { rememberMe: false }
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(values: LoginFormValues) {
    await new Promise((r) => setTimeout(r, 800));
    
    // Test data for admin login
    if (values.email === 'admin@test.com' && values.password === 'admin123') {
      console.log('Admin login successful', values);
      navigate('/admin');
    } else {
      console.log('Login submit', values);
      // For demo purposes, also allow any valid email/password combination
      navigate('/admin');
    }
  }

  return (
    <div className="auth-card" role="region" aria-labelledby="login-title">
      <div className="auth-card-header">
        <h1 id="login-title" className="auth-title">Welcome Back</h1>
        <div className="brand">TrackIt</div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            autoFocus
            placeholder="you@example.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: emailPattern, message: 'Enter a valid email' }
            })}
          />
          {errors.email && (
            <p className="form-error" role="alert">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Your password"
              aria-invalid={errors.password ? 'true' : 'false'}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'At least 8 characters' }
              })}
            />
            <button
              type="button"
              className="toggle-visibility"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && (
            <p className="form-error" role="alert">{errors.password.message}</p>
          )}
        </div>

        <div className="form-row">
          <label className="checkbox">
            <input type="checkbox" {...register('rememberMe')} />
            <span>Remember me</span>
          </label>
          <Link to="#" className="link subtle">Forgot Password?</Link>
        </div>

        <button type="submit" className="btn primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              <span>Signing in…</span>
            </>
          ) : (
            'Sign In'
          )}
        </button>

        <div className="form-footer">
          <span>Don't have an account?</span>
          <Link to="/signup" className="link">Sign up</Link>
        </div>
        
        <div className="test-data-hint">
          <p><strong>Test Data:</strong> admin@test.com / admin123</p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;


