import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
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
  const { login } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(values: LoginFormValues) {
    await new Promise((r) => setTimeout(r, 800));
    
    try {
      const success = await login(values.email, values.password);
      if (success) {
        // Redirect to dashboard for admin users, or home for regular users
        navigate('/dashboard');
      } else {
        // Handle login failure - could add error state here
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <div className="auth-card" role="region" aria-labelledby="login-title">
      <div className="auth-card-header">
        <h1 id="login-title" className="auth-title">Bienvenido de Vuelta</h1>
        <div className="brand">TrackIt</div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Dirección de correo electrónico</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            autoFocus
            placeholder="tu@ejemplo.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', {
              required: 'El correo electrónico es obligatorio',
              pattern: { value: emailPattern, message: 'Ingresa un correo válido' }
            })}
          />
          {errors.email && (
            <p className="form-error" role="alert">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Tu contraseña"
              aria-invalid={errors.password ? 'true' : 'false'}
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: { value: 8, message: 'Al menos 8 caracteres' }
              })}
            />
            <button
              type="button"
              className="toggle-visibility"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {errors.password && (
            <p className="form-error" role="alert">{errors.password.message}</p>
          )}
        </div>

        <div className="form-row">
          <label className="checkbox">
            <input type="checkbox" {...register('rememberMe')} />
            <span>Recordarme</span>
          </label>
          <Link to="#" className="link subtle">¿Olvidaste tu contraseña?</Link>
        </div>

        <button type="submit" className="btn primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              <span>Iniciando sesión…</span>
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </button>

        <div className="form-footer">
          <span>¿No tienes una cuenta?</span>
          <Link to="/signup" className="link">Regístrate</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
