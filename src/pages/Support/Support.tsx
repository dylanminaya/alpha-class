import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Support.css';

interface SupportChannel {
  id: string;
  title: string;
  description: string;
  icon: string;
  responseTime: string;
  availability: string;
  color: string;
  gradient: string;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const Support = () => {
  const [activeCategory, setActiveCategory] = useState('general');

  const supportChannels: SupportChannel[] = [
    {
      id: 'email',
      title: 'Email Support',
      description: 'Get detailed help with any questions or issues you encounter while using TrackIt.',
      icon: '📧',
      responseTime: 'Within 24 hours',
      availability: '24/7',
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Real-time assistance from our support team during business hours.',
      icon: '💬',
      responseTime: 'Instant',
      availability: 'Mon-Fri, 9AM-6PM EST',
      color: '#f093fb',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Speak directly with our support specialists for urgent matters.',
      icon: '📞',
      responseTime: 'Immediate',
      availability: 'Mon-Fri, 9AM-6PM EST',
      color: '#4facfe',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'help-center',
      title: 'Help Center',
      description: 'Comprehensive guides, tutorials, and troubleshooting articles.',
      icon: '📚',
      responseTime: 'Self-service',
      availability: '24/7',
      color: '#43e97b',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  const faqItems: FAQItem[] = [
    {
      question: 'How do I contact support?',
      answer: 'You can reach us through multiple channels: email at support@trackit.com, live chat on our website, or by calling our support line. For non-urgent issues, we recommend starting with our Help Center.',
      category: 'general'
    },
    {
      question: 'What information should I provide when contacting support?',
      answer: 'Please include your account email, a detailed description of the issue, steps to reproduce the problem, and any error messages you\'re seeing. Screenshots are also helpful.',
      category: 'general'
    },
    {
      question: 'How quickly will I get a response?',
      answer: 'Email support typically responds within 24 hours. Live chat and phone support provide immediate assistance during business hours. Premium and Enterprise users get priority support.',
      category: 'general'
    },
    {
      question: 'Do you offer support in languages other than English?',
      answer: 'Currently, we provide support in English and Spanish. We\'re working on adding more languages to better serve our global user base.',
      category: 'general'
    },
    {
      question: 'Can I get help with setting up my account?',
      answer: 'Absolutely! Our support team can help you with account setup, data migration, and initial configuration. We also offer onboarding sessions for Premium and Enterprise users.',
      category: 'account'
    },
    {
      question: 'What if I find a bug in the application?',
      answer: 'Please report bugs through our support channels or use the "Report Bug" feature in the app. Include detailed steps to reproduce the issue and we\'ll investigate promptly.',
      category: 'technical'
    },
    {
      question: 'How do I request a new feature?',
      answer: 'We welcome feature requests! You can submit them through our support channels or community forum. Our product team reviews all suggestions and prioritizes them based on user demand.',
      category: 'feature'
    },
    {
      question: 'Is there a limit on support requests?',
      answer: 'Basic users get 5 support requests per month. Premium users get unlimited support requests, and Enterprise users get dedicated account management with unlimited priority support.',
      category: 'general'
    }
  ];

  const filteredFAQs = faqItems.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General Support' },
    { id: 'account', name: 'Account & Setup' },
    { id: 'technical', name: 'Technical Issues' },
    { id: 'feature', name: 'Feature Requests' }
  ];

  return (
    <div className="support-page">
      {/* Hero Section */}
      <section className="support-hero">
        <div className="hero-content">
          <h1 className="hero-title">We're Here to Help</h1>
          <p className="hero-subtitle">
            Get the support you need to make the most of TrackIt. Our team is dedicated to helping you succeed.
          </p>
        </div>
      </section>

      {/* Support Channels */}
      <section className="support-channels">
        <div className="container">
          <h2 className="section-title">How Can We Help You?</h2>
          <p className="section-subtitle">
            Choose the support channel that works best for you
          </p>
          
          <div className="channels-grid">
            {supportChannels.map((channel) => (
              <div
                key={channel.id}
                className="channel-card"
                style={{
                  '--channel-color': channel.color,
                  '--channel-gradient': channel.gradient
                } as React.CSSProperties}
              >
                <div className="channel-icon">{channel.icon}</div>
                <h3 className="channel-title">{channel.title}</h3>
                <p className="channel-description">{channel.description}</p>
                
                <div className="channel-details">
                  <div className="detail-item">
                    <span className="detail-label">Response Time:</span>
                    <span className="detail-value">{channel.responseTime}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Availability:</span>
                    <span className="detail-value">{channel.availability}</span>
                  </div>
                </div>
                
                <div className="channel-actions">
                  {channel.id === 'email' && (
                    <a href="mailto:support@trackit.com" className="channel-button">
                      Send Email
                    </a>
                  )}
                  {channel.id === 'chat' && (
                    <button className="channel-button" onClick={() => alert('Live chat coming soon!')}>
                      Start Chat
                    </button>
                  )}
                  {channel.id === 'phone' && (
                    <a href="tel:+1-800-TRACKIT" className="channel-button">
                      Call Now
                    </a>
                  )}
                  {channel.id === 'help-center' && (
                    <Link to="/help" className="channel-button">
                      Browse Articles
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Process */}
      <section className="support-process">
        <div className="container">
          <h2 className="section-title">How Our Support Process Works</h2>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Contact Us</h3>
              <p>Reach out through your preferred support channel with your question or issue.</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Quick Response</h3>
              <p>Our team will respond promptly with helpful guidance or request additional information.</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Resolution</h3>
              <p>We work with you until your issue is completely resolved and you're satisfied.</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Follow-up</h3>
              <p>We check back to ensure everything is working smoothly and you're happy with the solution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="support-faq">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          
          <div className="faq-categories">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="faq-list">
            {filteredFAQs.map((item, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{item.question}</h3>
                <p className="faq-answer">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="support-cta">
        <div className="container">
          <h2>Still Need Help?</h2>
          <p>Our support team is ready to assist you with any questions or concerns.</p>
          <div className="cta-buttons">
            <a href="mailto:support@trackit.com" className="cta-button primary">
              Contact Support
            </a>
            <Link to="/help" className="cta-button secondary">
              Visit Help Center
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
