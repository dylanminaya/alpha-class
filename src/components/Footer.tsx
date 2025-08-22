import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-title">Alpha Class</h3>
            <p className="footer-description">
              Empowering financial freedom through innovative banking solutions and personalized experiences.
            </p>
            <div className="footer-social">
              <a href="#twitter" className="social-link" aria-label="Twitter">
                <span>🐦</span>
              </a>
              <a href="#linkedin" className="social-link" aria-label="LinkedIn">
                <span>💼</span>
              </a>
              <a href="#facebook" className="social-link" aria-label="Facebook">
                <span>📘</span>
              </a>
              <a href="#instagram" className="social-link" aria-label="Instagram">
                <span>📷</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <div className="footer-links">
              <a href="#about-us" className="footer-link">About Us</a>
              <a href="#careers" className="footer-link">Careers</a>
              <a href="#blog" className="footer-link">Blog</a>
              <a href="#press" className="footer-link">Press</a>
            </div>
          </div>

          {/* Products */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Products</h4>
            <div className="footer-links">
              <a href="#expense-tracking" className="footer-link">Expense Tracking</a>
              <a href="#budget-management" className="footer-link">Budget Management</a>
              <a href="#debt-management" className="footer-link">Debt Management</a>
              <a href="#card-personalization" className="footer-link">Card Personalization</a>
            </div>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Support</h4>
            <div className="footer-links">
              <a href="#help-center" className="footer-link">Help Center</a>
              <a href="#contact-us" className="footer-link">Contact Us</a>
              <a href="#live-chat" className="footer-link">Live Chat</a>
              <a href="#faq" className="footer-link">FAQ</a>
            </div>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Legal</h4>
            <div className="footer-links">
              <a href="#terms" className="footer-link">Terms of Service</a>
              <a href="#privacy" className="footer-link">Privacy Policy</a>
              <a href="#cookies" className="footer-link">Cookie Policy</a>
              <a href="#security" className="footer-link">Security</a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2025 Alpha Class. All rights reserved.</p>
          </div>
          <div className="footer-legal-links">
            <a href="#terms" className="footer-legal-link">Terms</a>
            <span className="separator">•</span>
            <a href="#privacy" className="footer-legal-link">Privacy</a>
            <span className="separator">•</span>
            <a href="#cookies" className="footer-legal-link">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
