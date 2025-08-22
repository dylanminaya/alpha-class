import React from 'react';
import { History, Wallet, CreditCard, Snowflake, Palette } from 'lucide-react';
import './FeatureSections.css';

type Section = {
  id: string;
  title: string;
  description: string;
  points: string[];
  icon: React.ReactNode;
};

const sections: Section[] = [
  {
    id: 'history',
    title: 'Expense tracking & history',
    description: 'Track daily expenses, categorize automatically, and view historical insights.',
    points: ['Quick add from mobile', 'Smart categories', 'Monthly and yearly trends'],
    icon: <History size={22} />,
  },
  {
    id: 'budget',
    title: 'Budget creation and management',
    description: 'Create flexible budgets and receive tips to avoid overspending.',
    points: ['Custom limits per category', 'Alerts and nudges', 'Auto-adjust suggestions'],
    icon: <Wallet size={22} />,
  },
  {
    id: 'debt',
    title: 'Debt management',
    description: 'Plan repayments, compare strategies, and stay motivated to reach zero.',
    points: ['Avalanche/snowball options', 'Payment reminders', 'Progress visualizations'],
    icon: <CreditCard size={22} />,
  },
  {
    id: 'personalize',
    title: 'Card personalization',
    description: 'Choose designs and personalize your card to fit your style.',
    points: ['Multiple themes', 'Preview in real-time', 'Easy to apply'],
    icon: <Palette size={22} />,
  },
  {
    id: 'freeze',
    title: 'Freeze card functionality',
    description: 'Freeze or unfreeze your card with a tap for instant peace of mind.',
    points: ['One-tap freeze', 'Instant notifications', 'Secure and reversible'],
    icon: <Snowflake size={22} />,
  },
];

const FeatureSections: React.FC = () => {
  return (
    <section className="feature-sections" aria-label="Feature details">
      <div className="container">
        <div className="grid">
          {sections.map((s) => (
            <article key={s.id} className="card" aria-labelledby={`heading-${s.id}`}>
              <div className="card-icon" aria-hidden>
                {s.icon}
              </div>
              <h3 id={`heading-${s.id}`} className="card-title">{s.title}</h3>
              <p className="card-desc">{s.description}</p>
              <ul className="card-list">
                {s.points.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSections;


