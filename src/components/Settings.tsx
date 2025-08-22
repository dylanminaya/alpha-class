import React, { useState } from 'react';
import { Settings as SettingsIcon, Globe, Moon, Sun, Bell, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import './Settings.css';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const handleLanguageChange = (language: { code: string, name: string, flag: string }) => {
    setCurrentLanguage(language.name);
    setIsLanguageMenuOpen(false);
    // Aquí se implementaría la lógica de cambio de idioma
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="close-settings-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="settings-content">
          {/* Language Settings */}
          <div className="settings-section">
            <h3>Language</h3>
            <div className="language-selector">
              <button 
                className="language-btn"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              >
                <Globe size={18} />
                <span>{currentLanguage}</span>
                <span className="dropdown-arrow">▼</span>
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

          {/* Theme Settings */}
          <div className="settings-section">
            <h3>Theme</h3>
            <div className="theme-toggle-container">
              <button 
                className={`theme-option ${!isDarkMode ? 'active' : ''}`}
                onClick={() => !isDarkMode || toggleTheme()}
              >
                <Sun size={18} />
                <span>Light</span>
              </button>
              <button 
                className={`theme-option ${isDarkMode ? 'active' : ''}`}
                onClick={() => isDarkMode || toggleTheme()}
              >
                <Moon size={18} />
                <span>Dark</span>
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="settings-section">
            <h3>Notifications</h3>
            <div className="notification-settings">
              <label className="setting-toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
                <span>Email notifications</span>
              </label>
              <label className="setting-toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
                <span>Push notifications</span>
              </label>
              <label className="setting-toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
                <span>Payment reminders</span>
              </label>
            </div>
          </div>

          {/* Account Settings */}
          <div className="settings-section">
            <h3>Account</h3>
            <div className="account-actions">
              <button className="account-btn">
                <User size={18} />
                <span>Profile Settings</span>
              </button>
              <button className="account-btn">
                <span>Change Password</span>
              </button>
              <button className="account-btn danger">
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
