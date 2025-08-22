import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-headline">
              Una app de capital para independientes
            </h1>
            <p className="hero-subheadline">
              Cobra más rápido y gestiona tus finanzas sin esfuerzo. Perfecta para freelancers que buscan una solución financiera integral.
            </p>
            <button className="hero-cta">
              Únete hoy
            </button>
          </div>
          
          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="phone-header">
                  <div className="status-bar">
                    <span className="time">9:41</span>
                    <div className="signal-battery">
                      <span className="signal">●●●</span>
                      <span className="battery">100%</span>
                    </div>
                  </div>
                </div>
                <div className="app-content">
                  <h2 className="app-title">Pagos</h2>
                  <div className="visa-card">
                    <div className="card-info">
                      <span className="visa-logo">VISA</span>
                      <span className="card-number">●●●● 4851</span>
                    </div>
                  </div>
                  <div className="integration-message">
                    <p>Integra con un solo toque</p>
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
