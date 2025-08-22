import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/about" className="footer-link">About</Link>
          <Link to="/terms" className="footer-link">Terms of Service</Link>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
        </div>
        
        <div className="footer-copyright">
          <p>&copy;2024 TrackIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
