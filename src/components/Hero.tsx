import React, { useState, useEffect } from 'react';
import StarfieldBackground from './StarfieldBackground';
import './Hero.css';

const Hero: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {/* Animated Starfield Background */}
      <StarfieldBackground />
      
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-headline">
              A capital app for<br />
              <span className="highlight">independents</span>
            </h1>
            <p className="hero-subheadline">
              Get paid faster and manage your finances effortlessly. Perfect for freelancers seeking a seamless financial solution.
            </p>
            <button className="hero-cta">
              Join today
            </button>
          </div>
          
          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="phone-header">
                  <div className="status-bar">
                    <span className="time">{currentTime}</span>
                    <div className="signal-battery">
                      <span className="signal">●●●</span>
                      <span className="battery">100%</span>
                    </div>
                  </div>
                </div>
                <div className="app-content">
                  <h2 className="app-title">Payments</h2>
                  <div className="visa-card">
                    <div className="card-info">
                      <span className="visa-logo">VISA</span>
                      <span className="card-number">●●●● 4851</span>
                    </div>
                  </div>
                  <div className="integration-message">
                    <p>Integrate with just one single tap</p>
                    <div className="tap-indicator">
                      <div className="tap-circle"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
