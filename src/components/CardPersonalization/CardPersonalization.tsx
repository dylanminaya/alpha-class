import React, { useState } from 'react';
import './CardPersonalization.css';

interface CardTheme {
  id: string;
  name: string;
  description: string;
  background: string;
  textColor: string;
  accentColor: string;
  pattern?: string;
  icon: string;
}

const CardPersonalization: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [cardNumber, setCardNumber] = useState('**** **** **** 1234');
  const [cardHolder, setCardHolder] = useState('JOHN DOE');
  const [expiryDate, setExpiryDate] = useState('12/25');

  const themes: CardTheme[] = [
    {
      id: 'default',
      name: 'Default',
      description: 'Classic Alpha Class design',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#ffffff',
      accentColor: '#00d4ff',
      icon: '💳'
    },
    {
      id: 'midnight',
      name: 'Midnight',
      description: 'Elegant dark theme',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      textColor: '#ffffff',
      accentColor: '#00d4ff',
      pattern: 'radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)',
      icon: '🌙'
    },
    {
      id: 'aurora',
      name: 'Aurora',
      description: 'Northern lights inspired',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      textColor: '#ffffff',
      accentColor: '#00ffff',
      pattern: 'radial-gradient(circle at 80% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
      icon: '🌌'
    },
    {
      id: 'sunset',
      name: 'Sunset',
      description: 'Warm sunset colors',
      background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)',
      textColor: '#ffffff',
      accentColor: '#ffffff',
      pattern: 'radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
      icon: '🌅'
    },
    {
      id: 'ocean',
      name: 'Ocean',
      description: 'Deep ocean blues',
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
      textColor: '#ffffff',
      accentColor: '#00d4ff',
      pattern: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
      icon: '🌊'
    },
    {
      id: 'emerald',
      name: 'Emerald',
      description: 'Rich green tones',
      background: 'linear-gradient(135deg, #2d5016 0%, #4a7c59 50%, #6b8e23 100%)',
      textColor: '#ffffff',
      accentColor: '#00ff88',
      pattern: 'radial-gradient(circle at 30% 70%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)',
      icon: '💎'
    }
  ];

  const currentTheme = themes.find(theme => theme.id === selectedTheme) || themes[0];

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    // In a real app, this would save to backend and update the actual card
    console.log(`Card theme changed to: ${themeId}`);
  };

  const handleApplyTheme = () => {
    // In a real app, this would make an API call to update the card design
    console.log(`Applying theme: ${selectedTheme}`);
    // Show success message
    alert(`Theme "${currentTheme.name}" applied successfully!`);
  };

  return (
    <div className="card-personalization">
      <div className="personalization-header">
        <h2>💳 Card Personalization</h2>
        <p>Choose your preferred card design and see it in real-time</p>
      </div>

      <div className="personalization-content">
        {/* Card Preview */}
        <div className="card-preview-section">
          <h3>Card Preview</h3>
          <div 
            className="card-preview"
            style={{
              background: currentTheme.background,
              color: currentTheme.textColor,
              position: 'relative'
            }}
          >
            {currentTheme.pattern && (
              <div 
                className="card-pattern"
                style={{ background: currentTheme.pattern }}
              />
            )}
            
            <div className="card-content">
              <div className="card-header">
                <div className="card-logo">
                  <span className="logo-text">Alpha</span>
                  <span className="logo-class">Class</span>
                </div>
                <div className="card-chip">
                  <div className="chip"></div>
                </div>
              </div>

              <div className="card-number">
                {cardNumber}
              </div>

              <div className="card-footer">
                <div className="card-holder">
                  <span className="label">CARD HOLDER</span>
                  <span className="value">{cardHolder}</span>
                </div>
                <div className="card-expiry">
                  <span className="label">EXPIRES</span>
                  <span className="value">{expiryDate}</span>
                </div>
                <div className="card-brand">
                  <div className="brand-logo">
                    <span style={{ color: currentTheme.accentColor }}>α</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button 
            className="apply-theme-btn"
            onClick={handleApplyTheme}
            style={{ 
              background: currentTheme.background,
              color: currentTheme.textColor,
              border: `2px solid ${currentTheme.accentColor}`
            }}
          >
            Apply Theme
          </button>
        </div>

        {/* Theme Selection */}
        <div className="theme-selection-section">
          <h3>Choose Your Theme</h3>
          <div className="themes-grid">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`theme-option ${selectedTheme === theme.id ? 'selected' : ''}`}
                onClick={() => handleThemeChange(theme.id)}
              >
                <div className="theme-preview">
                  <div 
                    className="theme-card-mini"
                    style={{
                      background: theme.background,
                      color: theme.textColor
                    }}
                  >
                    <div className="mini-card-content">
                      <div className="mini-logo">α</div>
                      <div className="mini-number">****</div>
                    </div>
                  </div>
                </div>
                <div className="theme-info">
                  <div className="theme-header">
                    <span className="theme-icon">{theme.icon}</span>
                    <h4>{theme.name}</h4>
                  </div>
                  <p>{theme.description}</p>
                </div>
                {selectedTheme === theme.id && (
                  <div className="selected-indicator">
                    <span>✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Card Details Customization */}
        <div className="card-details-section">
          <h3>Card Details</h3>
          <div className="details-form">
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter card number"
                maxLength={19}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Card Holder</label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                  placeholder="CARD HOLDER NAME"
                  maxLength={20}
                />
              </div>
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPersonalization;
