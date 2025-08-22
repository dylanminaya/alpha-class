import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogoClick = () => {
    navigate('/');
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'graficos', label: 'Gráficos', icon: '📊' },
    { id: 'usuarios', label: 'Usuarios', icon: '👥' },
    { id: 'transacciones', label: 'Transacciones', icon: '💳' },
    { id: 'prestamos', label: 'Préstamos', icon: '💰' },
    { id: 'tarjetas', label: 'Tarjetas', icon: '💎' }
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button className="mobile-hamburger" onClick={toggleSidebar}>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobile ? (isMobileMenuOpen ? 'mobile-open' : 'mobile-closed') : ''}`}>
        {/* Desktop Toggle Button */}
        {!isMobile && (
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <span className="toggle-icon">{isCollapsed ? '▶️' : '◀️'}</span>
          </button>
        )}

        {/* Header with Logo */}
        <div className="sidebar-header">
          <div className="logo" onClick={handleLogoClick}>
            <span className="logo-icon">💚</span>
            {(!isCollapsed || isMobile) && <span className="logo-text">TrackIt</span>}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-button ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleSectionChange(item.id)}
                  title={isCollapsed && !isMobile ? item.label : ''}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {(!isCollapsed || isMobile) && <span className="nav-label">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer with Logout */}
        <div className="sidebar-footer">
          <button 
            className="logout-button" 
            onClick={handleLogout}
            title={isCollapsed && !isMobile ? 'Cerrar Sesión' : ''}
          >
            <span className="logout-icon">🚪</span>
            {(!isCollapsed || isMobile) && <span className="logout-text">Cerrar Sesión</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
