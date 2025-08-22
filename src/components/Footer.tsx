import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a href="#about" className="footer-link">Acerca de</a>
          <a href="#terms" className="footer-link">Términos de Servicio</a>
          <a href="#privacy" className="footer-link">Política de Privacidad</a>
        </div>
        <div className="footer-copyright">
          <p>&copy;2024 TrackIt. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
