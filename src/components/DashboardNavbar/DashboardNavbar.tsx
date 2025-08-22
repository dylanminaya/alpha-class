import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundSelector from '../BackgroundSelector/BackgroundSelector';
import UserProfileModal from '../UserProfileModal/UserProfileModal';
import { ExportService } from '../../services/ExportService';
import './DashboardNavbar.css';

interface DashboardNavbarProps {
  onBackgroundChange?: (background: string) => void;
  currentBackground?: string;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ 
  onBackgroundChange, 
  currentBackground = 'default' 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleExportData = (format: 'excel' | 'pdf' | 'csv') => {
    try {
      switch (format) {
        case 'excel':
          ExportService.exportToExcel();
          break;
        case 'pdf':
          ExportService.exportToPDF();
          break;
        case 'csv':
          ExportService.exportToCSV();
          break;
      }
      console.log(`Data exported successfully to ${format}`);
    } catch (error) {
      console.error(`Error exporting data to ${format}:`, error);
    }
  };

  const handleUserProfileSave = (userData: any) => {
    console.log('User profile saved:', userData);
    // Aquí iría la lógica para guardar los datos del usuario
  };

  return (
    <nav className="dashboard-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <h2>Alpha Class</h2>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-links">
          <div className="nav-group">
            {/* Features Dropdown */}
            <div className="nav-dropdown">
              <button 
                className="nav-dropdown-trigger"
                onClick={() => toggleDropdown('features')}
                onMouseEnter={() => setActiveDropdown('features')}
              >
                <span className="nav-icon">⚡</span>
                Features
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`nav-dropdown-menu ${activeDropdown === 'features' ? 'active' : ''}`}
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
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="nav-dropdown">
              <button 
                className="nav-dropdown-trigger"
                onClick={() => toggleDropdown('services')}
                onMouseEnter={() => setActiveDropdown('services')}
              >
                <span className="nav-icon">🛠️</span>
                Services
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`nav-dropdown-menu ${activeDropdown === 'services' ? 'active' : ''}`}
                   onMouseLeave={() => setActiveDropdown(null)}>
                <a href="#request-loan" className="dropdown-item">
                  <span className="item-icon">💰</span>
                  Request Loan
                </a>
                <a href="#credit-card" className="dropdown-item">
                  <span className="item-icon">💳</span>
                  Credit Card
                </a>
                <a href="#savings-plan" className="dropdown-item">
                  <span className="item-icon">🏦</span>
                  Savings Plan
                </a>
                <a href="#investment" className="dropdown-item">
                  <span className="item-icon">📈</span>
                  Investment
                </a>
              </div>
            </div>

            {/* Accounts Dropdown */}
            <div className="nav-dropdown">
              <button 
                className="nav-dropdown-trigger"
                onClick={() => toggleDropdown('accounts')}
                onMouseEnter={() => setActiveDropdown('accounts')}
              >
                <span className="nav-icon">🏛️</span>
                Accounts
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`nav-dropdown-menu ${activeDropdown === 'accounts' ? 'active' : ''}`}
                   onMouseLeave={() => setActiveDropdown(null)}>
                <a href="#account-status" className="dropdown-item">
                  <span className="item-icon">📋</span>
                  Account Status
                </a>
                <a href="#card-status" className="dropdown-item">
                  <span className="item-icon">💳</span>
                  Card Status
                </a>
                <a href="#transactions" className="dropdown-item">
                  <span className="item-icon">📝</span>
                  Transactions
                </a>
                <a href="#statements" className="dropdown-item">
                  <span className="item-icon">📄</span>
                  Statements
                </a>
              </div>
            </div>

            {/* Export Dropdown */}
            <div className="nav-dropdown">
              <button 
                className="nav-dropdown-trigger"
                onClick={() => toggleDropdown('export')}
                onMouseEnter={() => setActiveDropdown('export')}
              >
                <span className="nav-icon">📤</span>
                Export
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`nav-dropdown-menu ${activeDropdown === 'export' ? 'active' : ''}`}
                   onMouseLeave={() => setActiveDropdown(null)}>
                <button 
                  className="dropdown-item export-item"
                  onClick={() => handleExportData('excel')}
                >
                  <span className="item-icon">📊</span>
                  Export to Excel
                </button>
                <button 
                  className="dropdown-item export-item"
                  onClick={() => handleExportData('pdf')}
                >
                  <span className="item-icon">📄</span>
                  Export to PDF
                </button>
                <button 
                  className="dropdown-item export-item"
                  onClick={() => handleExportData('csv')}
                >
                  <span className="item-icon">📋</span>
                  Export to CSV
                </button>
              </div>
            </div>

            {/* Settings Dropdown */}
            <div className="nav-dropdown">
              <button 
                className="nav-dropdown-trigger"
                onClick={() => toggleDropdown('settings')}
                onMouseEnter={() => setActiveDropdown('settings')}
              >
                <span className="nav-icon">⚙️</span>
                Settings
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`nav-dropdown-menu ${activeDropdown === 'settings' ? 'active' : ''}`}
                   onMouseLeave={() => setActiveDropdown(null)}>
                <button 
                  className="dropdown-item"
                  onClick={() => setShowUserProfile(true)}
                >
                  <span className="item-icon">👤</span>
                  Edit User Information
                </button>
                <a href="#security" className="dropdown-item">
                  <span className="item-icon">🔐</span>
                  Security Settings
                </a>
                <a href="#notifications" className="dropdown-item">
                  <span className="item-icon">🔔</span>
                  Notifications
                </a>
                <a href="#preferences" className="dropdown-item">
                  <span className="item-icon">🎨</span>
                  Preferences
                </a>
                {onBackgroundChange && (
                  <div className="dropdown-item background-item">
                    <span className="item-icon">🎨</span>
                    <BackgroundSelector 
                      onBackgroundChange={onBackgroundChange}
                      currentBackground={currentBackground}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* User Menu */}
        <div className="navbar-user">
          <div className="nav-dropdown">
            <button 
              className="nav-dropdown-trigger user-trigger"
              onClick={() => toggleDropdown('user')}
              onMouseEnter={() => setActiveDropdown('user')}
            >
              <span className="user-avatar">👤</span>
              <span className="user-name">Admin</span>
              <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className={`nav-dropdown-menu user-menu ${activeDropdown === 'user' ? 'active' : ''}`}
                 onMouseLeave={() => setActiveDropdown(null)}>
              <a href="#profile" className="dropdown-item">
                <span className="item-icon">👤</span>
                My Profile
              </a>
              <a href="#dashboard" className="dropdown-item">
                <span className="item-icon">📊</span>
                Dashboard
              </a>
              <div className="dropdown-divider"></div>
              <button 
                className="dropdown-item logout-item"
                onClick={handleLogout}
              >
                <span className="item-icon">🚪</span>
                Logout
              </button>
            </div>
          </div>
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
            <h3 className="mobile-section-title">Features</h3>
            <a href="#expense-tracking" className="mobile-link" onClick={() => setIsMenuOpen(false)}>📊 Expense Tracking</a>
            <a href="#budget-management" className="mobile-link" onClick={() => setIsMenuOpen(false)}>🎯 Budget Management</a>
            <a href="#debt-management" className="mobile-link" onClick={() => setIsMenuOpen(false)}>💳 Debt Management</a>
            <a href="#card-personalization" className="mobile-link" onClick={() => setIsMenuOpen(false)}>🎨 Card Personalization</a>
            <a href="#freeze-card" className="mobile-link" onClick={() => setIsMenuOpen(false)}>🔒 Freeze Card</a>
          </div>
          
          <div className="mobile-nav-section">
            <h3 className="mobile-section-title">Services</h3>
            <a href="#request-loan" className="mobile-link" onClick={() => setIsMenuOpen(false)}>💰 Request Loan</a>
            <a href="#credit-card" className="mobile-link" onClick={() => setIsMenuOpen(false)}>💳 Credit Card</a>
            <a href="#savings-plan" className="mobile-link" onClick={() => setIsMenuOpen(false)}>🏦 Savings Plan</a>
            <a href="#investment" className="mobile-link" onClick={() => setIsMenuOpen(false)}>📈 Investment</a>
          </div>
          
          <div className="mobile-nav-section">
            <h3 className="mobile-section-title">Accounts</h3>
            <a href="#account-status" className="mobile-link" onClick={() => setIsMenuOpen(false)}>📋 Account Status</a>
            <a href="#card-status" className="mobile-link" onClick={() => setIsMenuOpen(false)}>💳 Card Status</a>
            <a href="#transactions" className="mobile-link" onClick={() => setIsMenuOpen(false)}>📝 Transactions</a>
            <a href="#statements" className="mobile-link" onClick={() => setIsMenuOpen(false)}>📄 Statements</a>
          </div>

          <div className="mobile-nav-section">
            <h3 className="mobile-section-title">Export</h3>
            <button className="mobile-link export-link" onClick={() => { handleExportData('excel'); setIsMenuOpen(false); }}>📊 Export to Excel</button>
            <button className="mobile-link export-link" onClick={() => { handleExportData('pdf'); setIsMenuOpen(false); }}>📄 Export to PDF</button>
            <button className="mobile-link export-link" onClick={() => { handleExportData('csv'); setIsMenuOpen(false); }}>📋 Export to CSV</button>
          </div>
          
          <div className="mobile-nav-section">
            <h3 className="mobile-section-title">Settings</h3>
            <a href="#edit-profile" className="mobile-link" onClick={() => setIsMenuOpen(false)}>👤 Edit User Information</a>
            <a href="#security" className="mobile-link" onClick={() => setIsMenuOpen(false)}>🔐 Security Settings</a>
            <a href="#notifications" className="mobile-link" onClick={() => setIsMenuOpen(false)}>🔔 Notifications</a>
            <a href="#preferences" className="mobile-link" onClick={() => setIsMenuOpen(false)}>🎨 Preferences</a>
            <a href="#background" className="mobile-link" onClick={() => setIsMenuOpen(false)}>🎨 Change Background</a>
          </div>
        </div>
        
        <div className="mobile-cta">
          <button className="btn-logout mobile" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={showUserProfile}
        onClose={() => setShowUserProfile(false)}
        onSave={handleUserProfileSave}
      />
    </nav>
  );
};

export default DashboardNavbar;
