import React, { useState } from 'react';
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
                Product
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`nav-dropdown-menu ${activeDropdown === 'product' ? 'active' : ''}`}
                   onMouseLeave={() => setActiveDropdown(null)}>
                <a href="#features" className="dropdown-item">Features</a>
                <a href="#pricing" className="dropdown-item">Pricing</a>
                <a href="#integrations" className="dropdown-item">Integrations</a>
              </div>
            </div>

            <div className="nav-dropdown">
              <button 
                className="nav-dropdown-trigger"
                onClick={() => toggleDropdown('support')}
                onMouseEnter={() => setActiveDropdown('support')}
              >
                Support
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`nav-dropdown-menu ${activeDropdown === 'support' ? 'active' : ''}`}
                   onMouseLeave={() => setActiveDropdown(null)}>
                <a href="#help" className="dropdown-item">Help Center</a>
                <a href="#contact" className="dropdown-item">Contact Us</a>
                <a href="#community" className="dropdown-item">Community</a>
              </div>
            </div>

            <div className="nav-dropdown">
              <button 
                className="nav-dropdown-trigger"
                onClick={() => toggleDropdown('company')}
                onMouseEnter={() => setActiveDropdown('company')}
              >
                Company
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`nav-dropdown-menu ${activeDropdown === 'company' ? 'active' : ''}`}
                   onMouseLeave={() => setActiveDropdown(null)}>
                <a href="#about" className="dropdown-item">About</a>
                <a href="#careers" className="dropdown-item">Careers</a>
                <a href="#blog" className="dropdown-item">Blog</a>
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
            <h3 className="mobile-section-title">Product</h3>
            <a href="#features" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#pricing" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <a href="#integrations" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Integrations</a>
          </div>
          
          <div className="mobile-nav-section">
            <h3 className="mobile-section-title">Support</h3>
            <a href="#help" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Help Center</a>
            <a href="#contact" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Contact Us</a>
            <a href="#community" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Community</a>
          </div>
          
          <div className="mobile-nav-section">
            <h3 className="mobile-section-title">Company</h3>
            <a href="#about" className="mobile-link" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#careers" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Careers</a>
            <a href="#blog" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Blog</a>
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
