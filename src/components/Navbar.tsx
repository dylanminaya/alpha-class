import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  DollarSign, 
  Target,
  Menu,
  X,
  Globe,
  User,
  ChevronDown
} from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('Español');
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  // Don't show navbar on auth pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const handleLanguageChange = (language: { code: string, name: string, flag: string }) => {
    setCurrentLanguage(language.name);
    setIsLanguageMenuOpen(false);
    // Aquí se implementaría la lógica de cambio de idioma
  };

  return (
    <nav className="navbar">
      {/* Header con Logo y Controles */}
      <div className="navbar-header">
        <div className="navbar-container">
          {/* Logo a la izquierda */}
          <div className="navbar-logo">
            <Link to="/">
              <h2>economymanager</h2>
            </Link>
          </div>

          {/* Controles a la derecha */}
          <div className="navbar-controls">
            {/* CTA Buttons */}
            <div className="navbar-cta">
              <Link to="/login" className="btn-login">Iniciar Sesión</Link>
              <Link to="/signup" className="btn-signup">Registrarse</Link>
            </div>

            {/* Language Selector */}
            <div className="language-selector">
              <button 
                className="language-btn"
                onClick={toggleLanguageMenu}
              >
                <Globe size={18} />
                <span>{currentLanguage}</span>
                <ChevronDown size={16} />
              </button>
              
              {isLanguageMenuOpen && (
                <div className="language-dropdown">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      className="language-option"
                      onClick={() => handleLanguageChange(language)}
                    >
                      <span className="language-flag">{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navbar de Navegación */}
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
              Análisis
            </Link>
            <Link 
              to="/budget" 
              className={`navbar-link ${isActive('/budget') ? 'active' : ''}`}
            >
              <Target size={18} />
              Presupuesto
            </Link>
            <Link 
              to="/profile" 
              className={`navbar-link ${isActive('/profile') ? 'active' : ''}`}
            >
              <User size={18} />
              Mi Cuenta
            </Link>
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
          Análisis
        </Link>
        <Link 
          to="/budget" 
          className={`mobile-link ${isActive('/budget') ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <Target size={18} />
          Presupuesto
        </Link>
        <Link 
          to="/profile" 
          className={`mobile-link ${isActive('/profile') ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <User size={18} />
          Mi Cuenta
        </Link>
        
        {/* Mobile Language and User Options */}
        <div className="mobile-controls">
          <div className="mobile-language">
            <Globe size={18} />
            <span>Idioma: {currentLanguage}</span>
          </div>
        </div>
        
        <div className="mobile-cta">
          <Link to="/login" className="btn-login mobile">Iniciar Sesión</Link>
          <Link to="/signup" className="btn-signup mobile">Registrarse</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
