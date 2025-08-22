import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleSignup = () => {
    navigate('/signup');
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <span className="logo-text">TrackIt</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-links">
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/pricing" className="nav-link">Pricing</Link>
          <Link to="/support" className="nav-link">Support</Link>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="navbar-cta">
          <button className="btn-secondary" onClick={handleLogin}>Log In</button>
          <button className="btn-primary" onClick={handleSignup}>Sign Up</button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/features" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Features</Link>
        <Link to="/pricing" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
        <Link to="/support" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Support</Link>
        <div className="mobile-cta">
          <button className="btn-secondary" onClick={handleLogin}>Log In</button>
          <button className="btn-primary" onClick={handleSignup}>Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
