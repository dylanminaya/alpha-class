import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">About TrackIt</h1>
          <p className="hero-subtitle">
            Empowering freelancers and small businesses with intelligent financial management
          </p>
        </div>
        
        {/* Creative About Illustration */}
        <div className="about-illustration">
          <div className="company-building">
            <div className="building-base"></div>
            <div className="building-windows">
              <div className="window-row">
                <div className="window"></div>
                <div className="window"></div>
                <div className="window"></div>
              </div>
              <div className="window-row">
                <div className="window"></div>
                <div className="window"></div>
                <div className="window"></div>
              </div>
            </div>
            <div className="building-roof"></div>
            <div className="company-flag">
              <div className="flag-pole"></div>
              <div className="flag-banner"></div>
            </div>
          </div>
          
          <div className="connection-lines">
            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              At TrackIt, we believe that financial management shouldn't be complicated or time-consuming. 
              Our mission is to provide freelancers and small businesses with powerful, intuitive tools 
              that make tracking income, managing expenses, and understanding financial health effortless.
            </p>
            <p>
              We're committed to democratizing financial intelligence, ensuring that everyone has access 
              to the insights they need to make informed decisions and grow their businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2>Our Story</h2>
              <p>
                TrackIt was born from a simple frustration: existing financial tools were either too complex 
                for freelancers or too basic for serious business needs. Our founders, experienced freelancers 
                themselves, knew there had to be a better way.
              </p>
              <p>
                Starting in 2020, we built TrackIt from the ground up, focusing on what matters most: 
                simplicity, accuracy, and actionable insights. Today, thousands of freelancers and small 
                businesses trust TrackIt to manage their finances and drive growth.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <span>🚀</span>
                <p>Building the future of financial management</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Simplicity First</h3>
              <p>We believe powerful tools should be easy to use. Every feature is designed with user experience in mind.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h3>Security & Privacy</h3>
              <p>Your financial data is sacred. We use bank-level security and never share your information.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>We continuously improve our platform, always looking for ways to make financial management better.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>We're building more than a tool - we're building a community of empowered entrepreneurs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <span>👨‍💼</span>
              </div>
              <h3>Alex Chen</h3>
              <p className="member-role">CEO & Co-founder</p>
              <p className="member-bio">
                Former freelancer turned entrepreneur. Passionate about making financial tools accessible to everyone.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <span>👩‍💻</span>
              </div>
              <h3>Sarah Johnson</h3>
              <p className="member-role">CTO & Co-founder</p>
              <p className="member-bio">
                Tech enthusiast with 10+ years building scalable financial applications. Loves solving complex problems simply.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <span>👨‍🎨</span>
              </div>
              <h3>Mike Rodriguez</h3>
              <p className="member-role">Head of Design</p>
              <p className="member-bio">
                UX/UI expert who believes beautiful design should serve function. Creates intuitive experiences users love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="about-cta">
        <div className="container">
          <h2>Get in Touch</h2>
          <p>Have questions about TrackIt? We'd love to hear from you.</p>
          <div className="cta-buttons">
            <a href="mailto:hello@trackit.com" className="cta-button primary">Contact Us</a>
            <Link to="/support" className="cta-button secondary">Support</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
