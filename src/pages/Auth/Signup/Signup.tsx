import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../../../components/Forms/SignupForm/SignupForm';
import './Signup.css';

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  workType: string;
  agreeToTerms: boolean;
}

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSignup = async (formData: SignupFormData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll simulate a successful signup
      console.log('Signup attempt:', formData);
      
      // In a real app, you would:
      // 1. Call your user registration API
      // 2. Handle email verification if required
      // 3. Store the auth token or redirect to login
      // 4. Update global auth state
      // 5. Redirect to onboarding or dashboard
      
      // For now, we'll redirect to login with a success message
      navigate('/login', { 
        state: { 
          message: 'Account created successfully! Please sign in.' 
        }
      });
      
    } catch (err) {
      // Handle different types of errors
      if (err instanceof Error) {
        if (err.message.includes('email')) {
          setError('This email is already registered. Please use a different email or try signing in.');
        } else {
          setError('Something went wrong. Please try again.');
        }
      } else {
        setError('Unable to create account. Please try again later.');
      }
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-page-container">
        <SignupForm 
          onSubmit={handleSignup}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Signup;

