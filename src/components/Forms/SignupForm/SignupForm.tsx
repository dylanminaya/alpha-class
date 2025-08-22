import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './SignupForm.css';

type SignupFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  workType: 'Freelancer' | 'Consultor' | 'Contratista Independiente' | 'Otro' | '';
  agree: boolean;
};

const emailPattern = /^(?:[a-zA-Z0-9_'^&+%\-]+(?:\.[a-zA-Z0-9_'^&+%\-]+)*)@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}$/;

function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score >= 3) return 'strong';
  if (score === 2) return 'medium';
  return 'weak';
}

const SignupForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignupFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { workType: '', agree: false }
  });

  const [emailCheckLoading, setEmailCheckLoading] = useState(false);
  const password = watch('password');
  const strength = useMemo(() => getPasswordStrength(password || ''), [password]);

  async function onSubmit(values: SignupFormValues) {
    await new Promise((r) => setTimeout(r, 900));
    // Placeholder: integrate with backend auth API
    console.log('Signup submit', values);
  }

  async function checkEmailAvailability(value: string) {
    setEmailCheckLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setEmailCheckLoading(false);
    // Placeholder: In a real app, check if email `value` is available
    console.log('Checking email availability for:', value);
    return true; // Always available in this placeholder
  }

  return (
    <div className="auth-card" role="region" aria-labelledby="signup-title">
      <div className="auth-card-header">
        <h1 id="signup-title" className="auth-title">Únete a TrackIt</h1>
        <div className="brand">TrackIt</div>
        <p className="subtitle">Gestiona tu capital con claridad y facilidad.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="auth-form">
        <div className="form-group">
          <label htmlFor="fullName">Nombre completo</label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="María García"
            aria-invalid={errors.fullName ? 'true' : 'false'}
            {...register('fullName', { required: 'El nombre completo es obligatorio' })}
          />
          {errors.fullName && <p className="form-error" role="alert">{errors.fullName.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Dirección de correo electrónico</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="tu@ejemplo.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', {
              required: 'El correo electrónico es obligatorio',
              pattern: { value: emailPattern, message: 'Ingresa un correo válido' },
              validate: async (v) => (await checkEmailAvailability(v)) || 'El correo ya está en uso'
            })}
          />
          {emailCheckLoading && <p className="hint">Verificando correo…</p>}
          {errors.email && <p className="form-error" role="alert">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Crea una contraseña segura"
            aria-invalid={errors.password ? 'true' : 'false'}
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: { value: 8, message: 'Al menos 8 caracteres' }
            })}
          />
          <div className={`strength ${strength}`}>Seguridad: {strength === 'weak' ? 'débil' : strength === 'medium' ? 'media' : 'fuerte'}</div>
          {errors.password && <p className="form-error" role="alert">{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Vuelve a ingresar tu contraseña"
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            {...register('confirmPassword', {
              required: 'Por favor confirma tu contraseña',
              validate: (val) => val === password || 'Las contraseñas no coinciden'
            })}
          />
          {errors.confirmPassword && <p className="form-error" role="alert">{errors.confirmPassword.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="workType">Tipo de trabajo</label>
          <select id="workType" aria-invalid={errors.workType ? 'true' : 'false'} {...register('workType', { required: 'Selecciona tu tipo de trabajo' })}>
            <option value="">Seleccionar…</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Consultor">Consultor</option>
            <option value="Contratista Independiente">Contratista Independiente</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.workType && <p className="form-error" role="alert">{errors.workType.message}</p>}
        </div>

        <div className="form-row">
          <label className="checkbox">
            <input type="checkbox" {...register('agree', { required: 'Debes aceptar para continuar' })} />
            <span>Acepto los <a className="link" href="#">Términos de Servicio</a> y la <a className="link" href="#">Política de Privacidad</a> de TrackIt</span>
          </label>
        </div>
        {errors.agree && <p className="form-error" role="alert">{errors.agree.message}</p>}

        <button type="submit" className="btn primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              <span>Creando…</span>
            </>
          ) : (
            'Crear Cuenta'
          )}
        </button>

        <div className="form-footer">
          <span>¿Ya tienes una cuenta?</span>
          <Link to="/login" className="link">Iniciar sesión</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
