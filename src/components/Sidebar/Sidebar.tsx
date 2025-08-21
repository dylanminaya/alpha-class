import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogout = () => {
    logout();
    onClose();
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/dashboard'
    },
    {
      id: 'savings',
      label: 'Ahorros',
      icon: '💰',
      path: '/savings'
    },
    {
      id: 'loans',
      label: 'Solicitud de Préstamos',
      icon: '🏦',
      path: '/loans'
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: '⚙️',
      path: '/settings'
    },
    {
      id: 'support',
      label: 'Soporte y Contacto',
      icon: '📞',
      path: '/support'
    }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="user-profile">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-info">
              <h3>{user?.name || 'Usuario'}</h3>
              <span>{user?.role || 'Usuario'}</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="theme-toggle">
            <span className="toggle-label">Modo {theme === 'dark' ? 'Oscuro' : 'Claro'}</span>
            <button 
              className={`toggle-btn ${theme === 'dark' ? 'dark' : 'light'}`}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>
          
          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
