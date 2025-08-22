import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.nav-dropdown')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Don't show navbar on auth pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <h2>Alpha Class</h2>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-links">
          <div className="nav-group">
            <div className="nav-dropdown">
              <button 
                className="nav-dropdown-trigger"
                onClick={() => toggleDropdown('product')}
                onMouseEnter={() => setActiveDropdown('product')}
              >
                <span className="nav-icon">🚀</span>
                Product
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`nav-dropdown-menu ${activeDropdown === 'product' ? 'active' : ''}`}
                   onMouseLeave={() => setActiveDropdown(null)}>
                <a href="#expense-tracking" className="dropdown-item">
                  <span className="item-icon">📊</span>
                  Expense Tracking
                </a>
                <a href="#budget-management" className="dropdown-item">
                  <span className="item-icon">🎯</span>
                  Budget Management
                </a>
                <a href="#debt-management" className="dropdown-item">
                  <span className="item-icon">💳</span>
                  Debt Management
                </a>
                <a href="#card-personalization" className="dropdown-item">
                  <span className="item-icon">🎨</span>
                  Card Personalization
                </a>
                <a href="#freeze-card" className="dropdown-item">
                  <span className="item-icon">🔒</span>
                  Freeze Card
                </a>
                <a href="#mobile-app" className="dropdown-item">
                  <span className="item-icon">📱</span>
                  Mobile App
                </a>
              </div>
            </div>

            <div className="nav-dropdown">
              <button 
                className="nav-dropdown-trigger"
                onClick={() => toggleDropdown('support')}
                onMouseEnter={() => setActiveDropdown('support')}
              >
                <span className="nav-icon">🛠️</span>
                Support
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`nav-dropdown-menu ${activeDropdown === 'support' ? 'active' : ''}`}
                   onMouseLeave={() => setActiveDropdown(null)}>
                <a href="#help-center" className="dropdown-item">
                  <span className="item-icon">❓</span>
                  Help Center
                </a>
                <a href="#contact-us" className="dropdown-item">
                  <span className="item-icon">📞</span>
                  Contact Us
                </a>
                <a href="#live-chat" className="dropdown-item">
                  <span className="item-icon">💬</span>
                  Live Chat
                </a>
                <a href="#faq" className="dropdown-item">
                  <span className="item-icon">❔</span>
                  FAQ
                </a>
                <a href="#tutorials" className="dropdown-item">
                  <span className="item-icon">📚</span>
                  Tutorials
                </a>
                <a href="#community" className="dropdown-item">
                  <span className="item-icon">👥</span>
                  Community
                </a>
              </div>
            </div>

            <div className="nav-dropdown">
              <button 
                className="nav-dropdown-trigger"
                onClick={() => toggleDropdown('company')}
                onMouseEnter={() => setActiveDropdown('company')}
              >
                <span className="nav-icon">🏛️</span>
                Company
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`nav-dropdown-menu ${activeDropdown === 'company' ? 'active' : ''}`}
                   onMouseLeave={() => setActiveDropdown(null)}>
                <a href="#about-us" className="dropdown-item">
                  <span className="item-icon">ℹ️</span>
                  About Us
                </a>
                <a href="#our-mission" className="dropdown-item">
                  <span className="item-icon">🎯</span>
                  Our Mission
                </a>
                <a href="#leadership" className="dropdown-item">
                  <span className="item-icon">👨‍💼</span>
                  Leadership
                </a>
                <a href="#careers" className="dropdown-item">
                  <span className="item-icon">💼</span>
                  Careers
                </a>
                <a href="#press" className="dropdown-item">
                  <span className="item-icon">📰</span>
                  Press
                </a>
                <a href="#blog" className="dropdown-item">
                  <span className="item-icon">📝</span>
                  Blog
                </a>
                <a href="#investors" className="dropdown-item">
                  <span className="item-icon">💰</span>
                  Investors
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="navbar-cta">
          <Link to="/login" className="btn-login">Log In</Link>
          <Link to="/signup" className="btn-signup">Sign Up</Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="hamburger" onClick={toggleMenu}>
          <span className={isMenuOpen ? 'active' : ''}></span>
          <span className={isMenuOpen ? 'active' : ''}></span>
          <span className={isMenuOpen ? 'active' : ''}></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-group">
          <div className="mobile-nav-section">
            <h3 className="mobile-section-title">🚀 Product</h3>
            <a href="#expense-tracking" className="mobile-link" onClick={() => setIsMenuOpen(false)}>📊 Expense Tracking</a>
            <a href="#budget-management" className="mobile-link" onClick={() => setIsMenuOpen(false)}>🎯 Budget Management</a>
            <a href="#debt-management" className="mobile-link" onClick={() => setIsMenuOpen(false)}>💳 Debt Management</a>
            <a href="#card-personalization" className="mobile-link" onClick={() => setIsMenuOpen(false)}>🎨 Card Personalization</a>
            <a href="#freeze-card" className="mobile-link" onClick={() => setIsMenuOpen(false)}>🔒 Freeze Card</a>
            <a href="#mobile-app" className="mobile-link" onClick={() => setIsMenuOpen(false)}>📱 Mobile App</a>
          </div>
          
          <div className="mobile-nav-section">
            <h3 className="mobile-section-title">🛠️ Support</h3>
            <a href="#help-center" className="mobile-link" onClick={() => setIsMenuOpen(false)}>❓ Help Center</a>
            <a href="#contact-us" className="mobile-link" onClick={() => setIsMenuOpen(false)}>📞 Contact Us</a>
            <a href="#live-chat" className="mobile-link" onClick={() => setIsMenuOpen(false)}>💬 Live Chat</a>
            <a href="#faq" className="mobile-link" onClick={() => setIsMenuOpen(false)}>❔ FAQ</a>
            <a href="#tutorials" className="mobile-link" onClick={() => setIsMenuOpen(false)}>📚 Tutorials</a>
            <a href="#community" className="mobile-link" onClick={() => setIsMenuOpen(false)}>👥 Community</a>
          </div>
          
          <div className="mobile-nav-section">
            <h3 className="mobile-section-title">🏛️ Company</h3>
            <a href="#about-us" className="mobile-link" onClick={() => setIsMenuOpen(false)}>ℹ️ About Us</a>
            <a href="#our-mission" className="mobile-link" onClick={() => setIsMenuOpen(false)}>🎯 Our Mission</a>
            <a href="#leadership" className="mobile-link" onClick={() => setIsMenuOpen(false)}>👨‍💼 Leadership</a>
            <a href="#careers" className="mobile-link" onClick={() => setIsMenuOpen(false)}>💼 Careers</a>
            <a href="#press" className="mobile-link" onClick={() => setIsMenuOpen(false)}>📰 Press</a>
            <a href="#blog" className="mobile-link" onClick={() => setIsMenuOpen(false)}>📝 Blog</a>
            <a href="#investors" className="mobile-link" onClick={() => setIsMenuOpen(false)}>💰 Investors</a>
          </div>
        </div>
        
        <div className="mobile-cta">
          <Link to="/login" className="btn-login mobile">Log In</Link>
          <Link to="/signup" className="btn-signup mobile">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
