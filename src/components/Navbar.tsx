import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  DollarSign, 
  Target,
  Menu,
  X,
  Globe,
  Settings as SettingsIcon
} from 'lucide-react';
import './Navbar.css';
import Settings from './Settings';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage] = useState('English');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Don't show navbar on auth pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;



  return (
    <nav className="navbar">
      {/* Header with Logo and Controls */}
      <div className="navbar-header">
        <div className="navbar-container">
          {/* Logo on the left */}
          <div className="navbar-logo">
            <Link to="/">
              <h2>economymanager</h2>
            </Link>
          </div>

          {/* Controls on the right */}
          <div className="navbar-controls">
            {/* CTA Buttons */}
            <div className="navbar-cta">
              <Link to="/login" className="btn-login">Log In</Link>
              <Link to="/signup" className="btn-signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Navbar */}
      <div className="navbar-navigation">
        <div className="navbar-container">
          <div className="navbar-links">
            <Link 
              to="/dashboard" 
              className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
            >
              <DollarSign size={18} />
              Dashboard
            </Link>
            <Link 
              to="/charts" 
              className={`navbar-link ${isActive('/charts') ? 'active' : ''}`}
            >
              <BarChart3 size={18} />
              Analysis
            </Link>
            <Link 
              to="/budget" 
              className={`navbar-link ${isActive('/budget') ? 'active' : ''}`}
            >
              <Target size={18} />
              Budget
            </Link>
            <button 
              className="navbar-link settings-nav-btn"
              onClick={() => setIsSettingsOpen(true)}
              title="Settings"
            >
              <SettingsIcon size={18} />
              Settings
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="hamburger" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link 
          to="/dashboard" 
          className={`mobile-link ${isActive('/dashboard') ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <DollarSign size={18} />
          Dashboard
        </Link>
        <Link 
          to="/charts" 
          className={`mobile-link ${isActive('/charts') ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <BarChart3 size={18} />
          Analysis
        </Link>
        <Link 
          to="/budget" 
          className={`mobile-link ${isActive('/budget') ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <Target size={18} />
          Budget
        </Link>
        <button 
          className="mobile-link settings-nav-btn"
          onClick={() => {
            setIsSettingsOpen(true);
            setIsMenuOpen(false);
          }}
        >
          <SettingsIcon size={18} />
          Settings
        </button>

        
        {/* Mobile Language and User Options */}
        <div className="mobile-controls">
          <div className="mobile-language">
            <Globe size={18} />
            <span>Language: {currentLanguage}</span>
          </div>
        </div>
        
        <div className="mobile-cta">
          <Link to="/login" className="btn-login mobile">Log In</Link>
          <Link to="/signup" className="btn-signup mobile">Sign Up</Link>
        </div>
      </div>
      
      {/* Settings Modal */}
      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </nav>
  );
};

export default Navbar;
