import React from 'react';
import SignupForm from '../../../components/Forms/SignupForm/SignupForm';
import './Signup.css';

const Signup: React.FC = () => {
  return (
    <div className="signup-page">
      <div className="signup-page-container">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
