import React from 'react';
import SignupForm from '../../../components/Forms/SignupForm/SignupForm';
import './Signup.css';

// Financial emojis for auth pages
const authEmojis = ['💰', '💳', '📊', '🧮', '💎', '🏦', '💵', '🪙', '📈'];

// Emoji Rain Component for Auth
function AuthEmojiRain() {
  return (
    <div className="emoji-rain">
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className="emoji">
          {authEmojis[Math.floor(Math.random() * authEmojis.length)]}
        </div>
      ))}
    </div>
  );
}

const Signup: React.FC = () => {
  return (
    <div className="signup-page">
      <AuthEmojiRain />
      <div className="signup-page-container">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
