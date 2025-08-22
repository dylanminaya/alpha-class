import React, { useState } from 'react';
import './BackgroundSelector.css';

interface BackgroundOption {
  id: string;
  name: string;
  gradient: string;
  preview: string;
}

interface BackgroundSelectorProps {
  onBackgroundChange: (background: string) => void;
  currentBackground: string;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ 
  onBackgroundChange, 
  currentBackground 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const backgroundOptions: BackgroundOption[] = [
    {
      id: 'lavender',
      name: 'Lavender',
      gradient: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)',
      preview: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)'
    },
    {
      id: 'cosmic',
      name: 'Cosmic',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%, #f093fb 100%)',
      preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%, #f093fb 100%)'
    },
    {
      id: 'midnight',
      name: 'Midnight',
      gradient: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)',
      preview: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)'
    },
    {
      id: 'aurora',
      name: 'Aurora',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'sunset',
      name: 'Sunset',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)',
      preview: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)'
    },
    {
      id: 'alpha-class',
      name: 'Alpha Class',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'emerald',
      name: 'Emerald',
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      preview: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    },
    {
      id: 'royal',
      name: 'Royal',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
    }
  ];

  const handleBackgroundSelect = (background: string) => {
    onBackgroundChange(background);
    setIsOpen(false);
  };

  const currentOption = backgroundOptions.find(option => option.id === currentBackground) || backgroundOptions[0];

  return (
    <div className="background-selector">
      <button 
        className="background-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="trigger-icon">🎨</span>
        <span className="trigger-text">Background</span>
        <div 
          className="current-preview"
          style={{ background: currentOption.preview }}
        ></div>
        <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className="background-dropdown">
          <div className="background-options">
            {backgroundOptions.map((option) => (
              <button
                key={option.id}
                className={`background-option ${currentBackground === option.id ? 'active' : ''}`}
                onClick={() => handleBackgroundSelect(option.gradient)}
              >
                <div 
                  className="background-preview"
                  style={{ background: option.preview }}
                ></div>
                <span className="background-name">{option.name}</span>
                {currentBackground === option.id && (
                  <span className="check-icon">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundSelector;
