import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupForm.css';

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  workType: string;
  agreeToTerms: boolean;
}

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
  isLoading?: boolean;
  error?: string;
}

const workTypeOptions = [
  { value: '', label: 'Select your work type' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'consultant', label: 'Consultant' },
  { value: 'independent-contractor', label: 'Independent Contractor' },
  { value: 'other', label: 'Other' },
];

const SignupForm = ({ onSubmit, isLoading = false, error }: SignupFormProps) => {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    workType: '',
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    feedback: string;
    color: string;
  }>({ score: 0, feedback: '', color: '#e5e7eb' });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    let feedback = '';
    let color = '#dc2626'; // red

    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 0:
      case 1:
        feedback = 'Very weak';
        color = '#dc2626';
        break;
      case 2:
        feedback = 'Weak';
        color = '#f59e0b';
        break;
      case 3:
        feedback = 'Fair';
        color = '#eab308';
        break;
      case 4:
        feedback = 'Good';
        color = '#22c55e';
        break;
      case 5:
        feedback = 'Strong';
        color = '#16a34a';
        break;
    }

    return { score, feedback, color };
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof SignupFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength.score < 3) {
      newErrors.password = 'Please choose a stronger password';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.workType) {
      newErrors.workType = 'Please select your work type';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service and Privacy Policy';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Update password strength
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }

    // Clear error when user starts typing
    if (errors[name as keyof SignupFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form-header">
        <div className="signup-logo">
          <span className="logo-text">TrackIt</span>
        </div>
        <h1 className="signup-title">Join TrackIt</h1>
        <p className="signup-subtitle">Create your account and start managing your finances effortlessly</p>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="fullName" className="form-label">
            Full name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`form-input ${errors.fullName ? 'error' : ''}`}
            placeholder="Enter your full name"
            autoComplete="name"
            disabled={isLoading}
          />
          {errors.fullName && (
            <span className="field-error">{errors.fullName}</span>
          )}
        </div>

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
              placeholder="Create a password"
              autoComplete="new-password"
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
          {formData.password && (
            <div className="password-strength">
              <div className="strength-bar">
                <div 
                  className="strength-fill" 
                  style={{ 
                    width: `${(passwordStrength.score / 5) * 100}%`,
                    backgroundColor: passwordStrength.color
                  }}
                ></div>
              </div>
              <span className="strength-text" style={{ color: passwordStrength.color }}>
                {passwordStrength.feedback}
              </span>
            </div>
          )}
          {errors.password && (
            <span className="field-error">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm password
          </label>
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input password-input ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="Confirm your password"
              autoComplete="new-password"
              disabled={isLoading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="field-error">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="workType" className="form-label">
            Work type
          </label>
          <select
            id="workType"
            name="workType"
            value={formData.workType}
            onChange={handleChange}
            className={`form-select ${errors.workType ? 'error' : ''}`}
            disabled={isLoading}
          >
            {workTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.workType && (
            <span className="field-error">{errors.workType}</span>
          )}
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className={`checkbox-input ${errors.agreeToTerms ? 'error' : ''}`}
              disabled={isLoading}
            />
            <span className="checkbox-text">
              I agree to TrackIt's{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="terms-link">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="terms-link">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.agreeToTerms && (
            <span className="field-error">{errors.agreeToTerms}</span>
          )}
        </div>

        <button
          type="submit"
          className="form-submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading-spinner"></span>
          ) : (
            'Create Account'
          )}
        </button>

        <div className="form-footer">
          <p className="login-prompt">
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;

