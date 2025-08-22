import React from 'react';
import LoginForm from '../../../components/Forms/LoginForm/LoginForm';
import './Login.css';

// Financial emojis for auth pages
const authEmojis = ['💰', '💳', '📊', '🧮', '💎', '🏦', '💵', '🪙'];

// Emoji Rain Component for Auth
function AuthEmojiRain() {
  return (
    <div className="emoji-rain">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="emoji">
          {authEmojis[Math.floor(Math.random() * authEmojis.length)]}
        </div>
      ))}
    </div>
  );
}

const Login: React.FC = () => {
  return (
    <div className="login-page">
      <AuthEmojiRain />
      <div className="login-page-container">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
