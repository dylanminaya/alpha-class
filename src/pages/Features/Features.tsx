import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Features.css';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [numbers, setNumbers] = useState<Array<{id: number, value: number, x: number, y: number, angle: number, radius: number, speed: number, pulsePhase: number, rotationSpeed: number, scale: number}>>([]);

  const features = [
    {
      id: 1,
      title: "Smart Payment Tracking",
      description: "Automatically categorize and track all your payments with AI-powered insights. Never lose track of your income again.",
      icon: "💳",
      color: "#667eea",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: "Expense Management",
      description: "Organize expenses by category, set budgets, and get real-time spending alerts to stay on top of your finances.",
      icon: "📊",
      color: "#f093fb",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: "Invoice Generation",
      description: "Create professional invoices in seconds with customizable templates and automatic payment reminders.",
      icon: "📄",
      color: "#4facfe",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      id: 4,
      title: "Financial Analytics",
      description: "Get detailed insights into your financial health with beautiful charts and actionable recommendations.",
      icon: "📈",
      color: "#43e97b",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
      id: 5,
      title: "Multi-Currency Support",
      description: "Handle international payments and manage finances in multiple currencies with real-time exchange rates.",
      icon: "🌍",
      color: "#fa709a",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
      id: 6,
      title: "Secure Cloud Sync",
      description: "Access your financial data anywhere with bank-level security and automatic cloud synchronization.",
      icon: "☁️",
      color: "#a8edea",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    }
  ];

  // Generate numbers with enhanced positioning and effects
  useEffect(() => {
    const initialNumbers = Array.from({ length: 24 }, (_, index) => {
      // Create initial positions with more sophisticated distribution
      const row = Math.floor(index / 6);
      const col = index % 6;
      
      // Enhanced positioning with better spread
      const baseX = 8 + (col * 16) + (Math.random() - 0.5) * 6;
      const baseY = 12 + (row * 20) + (Math.random() - 0.5) * 4;
      
      return {
        id: index,
        value: Math.floor(Math.random() * 2001) - 1000,
        x: baseX,
        y: baseY,
        angle: (index * 15) * (Math.PI / 180),
        radius: 25 + Math.random() * 20, // Larger radius range for more dramatic movement
        speed: 0.3 + Math.random() * 0.4, // Slower, more varied speeds
        pulsePhase: Math.random() * Math.PI * 2, // Random pulse phase
        rotationSpeed: 0.5 + Math.random() * 1.5, // Individual rotation speeds
        scale: 0.8 + Math.random() * 0.4 // Random initial scales
      };
    });
    setNumbers(initialNumbers);
  }, []);

  // Enhanced animation with multiple effects
  useEffect(() => {
    const interval = setInterval(() => {
      setNumbers(prevNumbers => 
        prevNumbers.map(num => {
          // Update angle for circular movement
          const newAngle = num.angle + (num.speed * 0.015); // Even slower, more elegant
          
          // Calculate new position with elliptical motion for variety
          const centerX = 50;
          const centerY = 50;
          const ellipseRatio = 0.8; // Create elliptical paths
          const newX = centerX + Math.cos(newAngle) * num.radius;
          const newY = centerY + Math.sin(newAngle) * num.radius * ellipseRatio;
          
          // Add subtle wave motion
          const waveOffset = Math.sin(num.pulsePhase + Date.now() * 0.001) * 2;
          const finalX = newX + waveOffset;
          const finalY = newY + waveOffset;
          
          // Update pulse phase for breathing effect
          const newPulsePhase = num.pulsePhase + 0.02;
          
          return {
            ...num,
            x: finalX,
            y: finalY,
            angle: newAngle,
            pulsePhase: newPulsePhase
          };
        })
      );
    }, 80); // Slightly faster for smoother animation

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [features.length]);

  const handleFeatureClick = (index: number) => {
    setActiveFeature(index);
  };

  return (
    <div className="features-page">
      {/* Hero Section */}
      <section className="features-hero">
        {/* Static Numbers Display */}
        <div className="dynamic-numbers static-numbers">
          {numbers.map((num) => (
            <div
              key={num.id}
              className={`floating-number static-number ${num.value >= 0 ? 'positive' : 'negative'}`}
              style={{
                '--delay': `${num.id * 0.02}s`,
                '--x-pos': `${num.x}%`,
                '--y-pos': `${num.y}%`
              } as React.CSSProperties}
            >
              {num.value > 0 ? '+' : ''}{num.value}
            </div>
          ))}
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">Powerful Features</h1>
          <p className="hero-subtitle">
            Everything you need to manage your finances like a pro
          </p>
          <Link to="/signup" className="cta-button">
            Get Started Free
          </Link>
        </div>
        
        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-icon">💳</div>
          <div className="floating-icon">📊</div>
          <div className="floating-icon">📈</div>
          <div className="floating-icon">🌍</div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`feature-card ${index === activeFeature ? 'active' : ''} ${isVisible ? 'visible' : ''}`}
                onClick={() => handleFeatureClick(index)}
                style={{
                  '--delay': `${index * 0.1}s`,
                  '--feature-color': feature.color,
                  '--feature-gradient': feature.gradient
                } as React.CSSProperties}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                
                {/* Animated Background */}
                <div className="feature-bg"></div>
                
                {/* Hover Effect */}
                <div className="feature-hover-effect"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="demo-section">
        <div className="container">
          <h2 className="demo-title">See It In Action</h2>
          <div className="demo-container">
            <div className="demo-phone">
              <div className="phone-screen">
                <div className="demo-content">
                  <div className="demo-header">
                    <h3>TrackIt Dashboard</h3>
                    <div className="demo-stats">
                      <span className="stat">$2,450</span>
                      <span className="stat-label">This Month</span>
                    </div>
                  </div>
                  
                  <div className="demo-chart">
                    <div className="chart-bar" style={{ height: '60%' }}></div>
                    <div className="chart-bar" style={{ height: '80%' }}></div>
                    <div className="chart-bar" style={{ height: '45%' }}></div>
                    <div className="chart-bar" style={{ height: '90%' }}></div>
                    <div className="chart-bar" style={{ height: '70%' }}></div>
                  </div>
                  
                  <div className="demo-transactions">
                    <div className="transaction">
                      <span className="transaction-icon">💳</span>
                      <span className="transaction-text">Payment Received</span>
                      <span className="transaction-amount">+$500</span>
                    </div>
                    <div className="transaction">
                      <span className="transaction-icon">📊</span>
                      <span className="transaction-text">Expense Categorized</span>
                      <span className="transaction-amount">-$45</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="features-cta">
        <div className="container">
          <h2>Ready to Transform Your Finances?</h2>
          <p>Join thousands of freelancers who trust TrackIt</p>
          <div className="cta-buttons">
            <Link to="/signup" className="cta-primary">Start Free Trial</Link>
            <Link to="/pricing" className="cta-secondary">View Pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
