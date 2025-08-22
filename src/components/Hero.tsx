import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleJoinToday = () => {
    navigate('/signup');
  };

  return (
    <section className="hero">
      {/* Animated Diamonds Background */}
      <div className="diamonds-container">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className={`diamond diamond-${index + 1}`}
            style={{
              '--delay': `${index * 0.5}s`,
              '--duration': `${2 + (index % 3)}s`
            } as React.CSSProperties}
          />
        ))}
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-headline">
              A capital app for independents
            </h1>
            <p className="hero-subheadline">
              Get paid faster and manage your finances effortlessly. Perfect for freelancers seeking a seamless financial solution.
            </p>
            <button className="hero-cta" onClick={handleJoinToday}>
              Join today
            </button>
          </div>
          
          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="phone-header">
                  <div className="status-bar">
                    <span className="time">9:41</span>
                    <div className="signal-icons">
                      <span className="signal"></span>
                      <span className="wifi"></span>
                      <span className="battery"></span>
                    </div>
                  </div>
                </div>
                
                <div className="app-content">
                  <h2 className="app-title">Payments</h2>
                  
                  <div className="visa-card">
                    <div className="card-top">
                      <span className="visa-logo">VISA</span>
                    </div>
                    <div className="card-number">•••• •••• •••• 1234</div>
                    <div className="card-details">
                      <span className="card-name">John Doe</span>
                      <span className="card-expiry">12/25</span>
                    </div>
                  </div>
                  
                  <div className="integration-message">
                    <p>Integrate with just one single tap</p>
                    <div className="tap-indicator">
                      <div className="tap-circle"></div>
                      <div className="tap-ripple"></div>
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
