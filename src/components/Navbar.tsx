import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <h2>TrackIt</h2>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-links">
          <a href="#features" className="navbar-link">Funciones</a>
          <a href="#pricing" className="navbar-link">Precios</a>
          <a href="#support" className="navbar-link">Soporte</a>
        </div>

        {/* CTA Buttons */}
        <div className="navbar-cta">
          <Link to="/login" className="btn-login">Iniciar Sesión</Link>
          <Link to="/signup" className="btn-signup">Registrarse</Link>
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
        <a href="#features" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Funciones</a>
        <a href="#pricing" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Precios</a>
        <a href="#support" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Soporte</a>
        <div className="mobile-cta">
          <Link to="/login" className="btn-login mobile">Iniciar Sesión</Link>
          <Link to="/signup" className="btn-signup mobile">Registrarse</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
