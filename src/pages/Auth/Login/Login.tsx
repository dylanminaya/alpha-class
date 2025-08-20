import React from 'react';
import LoginForm from '../../../components/Forms/LoginForm/LoginForm';
import './Login.css';

const Login: React.FC = () => {
  return (
    <div className="login-page">
      <div className="login-page-container">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
