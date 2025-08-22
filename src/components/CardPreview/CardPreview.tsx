import React from 'react';
import './CardPreview.css';

interface CardTheme {
  id: string;
  name: string;
  background: string;
  textColor: string;
  accentColor: string;
  pattern?: string;
}

interface CardPreviewProps {
  theme: CardTheme;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  className?: string;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  theme,
  cardNumber = '**** **** **** 1234',
  cardHolder = 'JOHN DOE',
  expiryDate = '12/25',
  className = ''
}) => {
  return (
    <div 
      className={`card-preview ${className}`}
      style={{
        background: theme.background,
        color: theme.textColor,
        position: 'relative'
      }}
    >
      {theme.pattern && (
        <div 
          className="card-pattern"
          style={{ background: theme.pattern }}
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
              <span style={{ color: theme.accentColor }}>α</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
