import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../../components/Forms/LoginForm/LoginForm';
import './Login.css';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (formData: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for admin credentials
      if (formData.email === 'admin@trackit.com' && formData.password === 'admin123') {
        // Store auth token (in a real app, this would come from the API)
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'admin');
        navigate('/admin/dashboard');
      } else {
        // For demo purposes, accept any valid email/password combination
        if (formData.email && formData.password.length >= 6) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userRole', 'user');
          navigate('/');
        } else {
          setError('Invalid email or password');
        }
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <LoginForm 
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error}
        />
        

      </div>
    </div>
  );
};

export default Login;
