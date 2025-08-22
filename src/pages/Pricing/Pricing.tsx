import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pricing.css';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaAction: () => void;
}

const Pricing = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

  const handleGetStarted = (planName: string) => {
    // For free plan, go directly to signup
    if (planName === 'Basic') {
      navigate('/signup', { state: { plan: 'basic' } });
    } else {
      // For paid plans, go to signup with plan info
      navigate('/signup', { state: { plan: planName.toLowerCase() } });
    }
  };

  const pricingPlans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      period: 'Start Free',
      description: '',
      features: [
        'Track up to 5 clients',
        'Basic invoicing',
        'Expense tracking',
        'Monthly reports',
        'Email support',
        'Mobile app access'
      ],
      ctaText: 'Get Started Free',
      ctaAction: () => handleGetStarted('Basic')
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 20,
      period: 'Monthly',
      description: '',
      features: [
        'Unlimited clients',
        'Advanced invoicing & quotes',
        'Automated expense categorization',
        'Real-time financial dashboard',
        'Tax preparation assistance',
        'Integration with banks & payment processors',
        'Custom reports & analytics',
        'Priority support',
        'Multi-currency support',
        'Team collaboration (up to 3 users)'
      ],
      popular: true,
      ctaText: isAnnual ? 'Start Annual Plan' : 'Start Premium',
      ctaAction: () => handleGetStarted('Premium')
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 180,
      period: 'Annual',
      description: '',
      features: [
        'Everything in Premium',
        'Advanced tax optimization',
        'Dedicated account manager',
        'Custom integrations',
        'White-label options',
        'Advanced security features',
        'Unlimited team members',
        'API access',
        '24/7 phone support',
        'Custom training sessions'
      ],
      ctaText: 'Contact Sales',
      ctaAction: () => handleGetStarted('Enterprise')
    }
  ];

  return (
    <div className="pricing-page">
      <div className="pricing-container">
        {/* Header Section */}
        <div className="pricing-header">
          <h1 className="pricing-title">
            Choose Your Plan
          </h1>
          <p className="pricing-subtitle">
            Start free and scale as you grow. All plans include our core features to help you manage your finances effortlessly.
          </p>
          
          {/* Billing Toggle */}
          <div className="billing-toggle">
            <span className={`billing-option ${!isAnnual ? 'active' : ''}`}>
              Monthly
            </span>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="billing-toggle"
                checked={isAnnual}
                onChange={(e) => setIsAnnual(e.target.checked)}
                className="toggle-input"
              />
              <label htmlFor="billing-toggle" className="toggle-label">
                <span className="toggle-slider"></span>
              </label>
            </div>
            <span className={`billing-option ${isAnnual ? 'active' : ''}`}>
              Annual
              <span className="savings-badge">Save 25%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && (
                <div className="popular-badge">
                  Most Popular
                </div>
              )}
              
              <div className="card-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="price-container">
                  <span className="currency">$</span>
                  <span className="price">{plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
                <p className="plan-description">{plan.description}</p>
              </div>

              <div className="card-body">
                <ul className="features-list">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="check-icon">✓</span>
                      <span className="feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-footer">
                <button
                  className={`cta-button ${plan.popular ? 'primary' : 'secondary'}`}
                  onClick={plan.ctaAction}
                >
                  {plan.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="pricing-faq">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="faq-question">Can I change plans anytime?</h3>
              <p className="faq-answer">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">What payment methods do you accept?</h3>
              <p className="faq-answer">
                We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Annual plans can also be paid via bank transfer.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Is there a free trial?</h3>
              <p className="faq-answer">
                Our Basic plan is free forever! For Premium and Enterprise plans, we offer a 14-day free trial with full access to all features.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Do you offer refunds?</h3>
              <p className="faq-answer">
                Yes, we offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, we'll provide a full refund.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="pricing-cta">
          <h2 className="cta-title">Ready to get started?</h2>
          <p className="cta-description">
            Join thousands of independent professionals who trust TrackIt with their finances.
          </p>
          <div className="cta-buttons">
            <button 
              className="cta-button primary"
              onClick={() => navigate('/signup')}
            >
              Start Free Today
            </button>
            <button 
              className="cta-button secondary"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
