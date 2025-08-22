import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, History, Wallet, CreditCard, Snowflake, Palette } from 'lucide-react';
import './FeatureCarousel.css';

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const AUTO_INTERVAL_MS = 3000;

const useAutoRotate = (length: number, isPaused: boolean) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (isPaused || length <= 1) return;
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % length);
    }, AUTO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [length, isPaused]);
  return [index, setIndex] as const;
};

const FeatureCarousel: React.FC = () => {
  const features: Feature[] = useMemo(() => [
    {
      id: 'history',
      title: 'Expense tracking & history',
      description: 'Log expenses on the go and review trends over time.',
      icon: <History size={28} />,
    },
    {
      id: 'budget',
      title: 'Budget creation and management',
      description: 'Set smart budgets and stay on track with helpful nudges.',
      icon: <Wallet size={28} />,
    },
    {
      id: 'debt',
      title: 'Debt management',
      description: 'Plan repayments and visualize progress towards zero debt.',
      icon: <CreditCard size={28} />,
    },
    {
      id: 'personalize',
      title: 'Card personalization',
      description: 'Customize your card style to match your personality.',
      icon: <Palette size={28} />,
    },
    {
      id: 'freeze',
      title: 'Freeze card functionality',
      description: 'Instantly freeze/unfreeze your card for peace of mind.',
      icon: <Snowflake size={28} />,
    },
  ], []);

  const [isPaused, setPaused] = useState(false);
  const [active, setActive] = useAutoRotate(features.length, isPaused);

  const goPrev = () => setActive((active - 1 + features.length) % features.length);
  const goNext = () => setActive((active + 1) % features.length);

  return (
    <section aria-label="App features" className="feature-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container">
        <div className="carousel-surface" role="region" aria-roledescription="carousel" aria-live="polite">
          <button className="nav-btn prev" aria-label="Previous" onClick={goPrev}>
            <ChevronLeft size={22} />
          </button>
          <button className="nav-btn next" aria-label="Next" onClick={goNext}>
            <ChevronRight size={22} />
          </button>

          <div className="slide-viewport">
            <AnimatePresence mode="wait">
              <motion.div
                key={features[active].id}
                className="slide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="slide-icon" aria-hidden>
                  {features[active].icon}
                </div>
                <h3 className="slide-title">{features[active].title}</h3>
                <p className="slide-desc">{features[active].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="dots" role="tablist" aria-label="Select feature">
            {features.map((f, i) => (
              <button
                key={f.id}
                className={`dot ${i === active ? 'active' : ''}`}
                role="tab"
                aria-selected={i === active}
                aria-controls={`slide-${f.id}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCarousel;


