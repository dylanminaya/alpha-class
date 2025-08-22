import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a href="#about" className="footer-link">About</a>
          <a href="#terms" className="footer-link">Terms of Service</a>
          <a href="#privacy" className="footer-link">Privacy Policy</a>
        </div>
        <div className="footer-copyright">
          <p>&copy;2024 economymanager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
