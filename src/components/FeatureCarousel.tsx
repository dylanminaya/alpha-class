import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  const [failedImageById, setFailedImageById] = useState<Record<string, boolean>>({});
  const [direction, setDirection] = useState<1 | -1>(1);

  // 3D tilt using mouse position over the surface
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 12, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 12, mass: 0.4 });
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);
  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateYImg = useTransform(springX, [0, 1], [-14, 14]);
  const rotateXImg = useTransform(springY, [0, 1], [10, -10]);
  const rotateYText = useTransform(springX, [0, 1], [-6, 6]);
  const rotateXText = useTransform(springY, [0, 1], [4, -4]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!surfaceRef.current) return;
    const rect = surfaceRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width; // 0..1
    const relY = (e.clientY - rect.top) / rect.height; // 0..1
    pointerX.set(relX);
    pointerY.set(relY);
  };
  const handleMouseLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  const [rippleKey, setRippleKey] = useState(0);
  const triggerRipple = () => setRippleKey(k => k + 1);
  const goPrev = () => { setDirection(-1); setActive((active - 1 + features.length) % features.length); triggerRipple(); };
  const goNext = () => { setDirection(1); setActive((active + 1) % features.length); triggerRipple(); };

  const Illustration: React.FC<{ id: string }> = ({ id }) => {
    const gradA = 'var(--primary-2)';
    const gradB = 'var(--primary-5)';
    const accent = 'var(--primary-1)';
    return (
      <svg className="illus" viewBox="0 0 360 240" role="img" aria-label={`${id} illustration`}>
        <defs>
          <linearGradient id={`gA-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={gradA} />
            <stop offset="100%" stopColor={gradB} />
          </linearGradient>
          <linearGradient id={`gB-${id}`} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="360" height="240" rx="16" fill={`url(#gA-${id})`} />
        
        {/* Expense tracking & history */}
        {id === 'history' && (
          <g>
            {/* Receipt/transaction list */}
            <rect x="40" y="40" width="280" height="160" rx="12" fill="white" opacity="0.9" />
            <rect x="60" y="60" width="240" height="12" rx="6" fill={accent} opacity="0.8" />
            <rect x="60" y="80" width="180" height="8" rx="4" fill="var(--muted)" opacity="0.6" />
            <rect x="60" y="96" width="200" height="8" rx="4" fill="var(--muted)" opacity="0.6" />
            <rect x="60" y="112" width="160" height="8" rx="4" fill="var(--muted)" opacity="0.6" />
            <rect x="60" y="128" width="220" height="8" rx="4" fill="var(--muted)" opacity="0.6" />
            <rect x="60" y="144" width="140" height="8" rx="4" fill="var(--muted)" opacity="0.6" />
            <rect x="60" y="160" width="190" height="8" rx="4" fill="var(--muted)" opacity="0.6" />
            {/* Chart line */}
            <path d="M80 180 Q120 170 160 175 T240 165" stroke={accent} strokeWidth="3" fill="none" />
            <circle cx="80" cy="180" r="4" fill={accent} />
            <circle cx="160" cy="175" r="4" fill={accent} />
            <circle cx="240" cy="165" r="4" fill={accent} />
          </g>
        )}
        
        {/* Budget creation and management */}
        {id === 'budget' && (
          <g>
            {/* Budget pie chart */}
            <circle cx="180" cy="120" r="60" fill="white" opacity="0.9" />
            <path d="M180 120 L180 60 A60 60 0 0 1 210 90 Z" fill={accent} opacity="0.8" />
            <path d="M180 120 L210 90 A60 60 0 0 1 240 120 Z" fill="var(--primary-3)" opacity="0.8" />
            <path d="M180 120 L240 120 A60 60 0 0 1 210 150 Z" fill="var(--primary-4)" opacity="0.8" />
            <path d="M180 120 L210 150 A60 60 0 0 1 180 180 Z" fill="var(--primary-5)" opacity="0.8" />
            <circle cx="180" cy="120" r="20" fill="white" />
            {/* Budget categories */}
            <rect x="40" y="40" width="80" height="40" rx="8" fill="white" opacity="0.8" />
            <rect x="50" y="50" width="60" height="6" rx="3" fill={accent} />
            <rect x="50" y="62" width="40" height="6" rx="3" fill="var(--muted)" />
            <rect x="240" y="40" width="80" height="40" rx="8" fill="white" opacity="0.8" />
            <rect x="250" y="50" width="60" height="6" rx="3" fill="var(--primary-3)" />
            <rect x="250" y="62" width="35" height="6" rx="3" fill="var(--muted)" />
          </g>
        )}
        
        {/* Debt management */}
        {id === 'debt' && (
          <g>
            {/* Credit card with debt visualization */}
            <rect x="60" y="80" width="240" height="140" rx="12" fill="white" opacity="0.9" />
            <rect x="80" y="100" width="200" height="30" rx="6" fill={accent} opacity="0.8" />
            <rect x="80" y="140" width="180" height="8" rx="4" fill="var(--muted)" opacity="0.6" />
            <rect x="80" y="156" width="160" height="8" rx="4" fill="var(--muted)" opacity="0.6" />
            <rect x="80" y="172" width="140" height="8" rx="4" fill="var(--muted)" opacity="0.6" />
            {/* Progress bar */}
            <rect x="80" y="200" width="200" height="8" rx="4" fill="var(--muted)" opacity="0.3" />
            <rect x="80" y="200" width="120" height="8" rx="4" fill={accent} opacity="0.8" />
            {/* Debt reduction arrow */}
            <path d="M200 40 L200 80 M190 70 L200 80 L210 70" stroke={accent} strokeWidth="3" fill="none" />
            <text x="200" y="35" textAnchor="middle" fill={accent} fontSize="12" fontWeight="bold">$0</text>
          </g>
        )}
        
        {/* Card personalization */}
        {id === 'personalize' && (
          <g>
            {/* Credit card with design elements */}
            <rect x="60" y="60" width="240" height="140" rx="12" fill="white" opacity="0.9" />
            {/* Card gradient background */}
            <rect x="70" y="70" width="220" height="120" rx="8" fill={`url(#gB-${id})`} />
            {/* Card chip */}
            <rect x="80" y="90" width="30" height="20" rx="4" fill="gold" opacity="0.8" />
            {/* Card number */}
            <rect x="80" y="120" width="200" height="12" rx="6" fill="white" opacity="0.9" />
            <rect x="80" y="140" width="160" height="8" rx="4" fill="white" opacity="0.7" />
            <rect x="80" y="155" width="120" height="8" rx="4" fill="white" opacity="0.7" />
            {/* Design pattern */}
            <circle cx="280" cy="100" r="15" fill="white" opacity="0.3" />
            <circle cx="290" cy="110" r="8" fill="white" opacity="0.2" />
            <circle cx="270" cy="130" r="12" fill="white" opacity="0.25" />
            {/* Color palette */}
            <rect x="40" y="40" width="20" height="20" rx="4" fill={accent} />
            <rect x="70" y="40" width="20" height="20" rx="4" fill="var(--primary-3)" />
            <rect x="100" y="40" width="20" height="20" rx="4" fill="var(--primary-4)" />
            <rect x="130" y="40" width="20" height="20" rx="4" fill="var(--primary-5)" />
          </g>
        )}
        
        {/* Freeze card functionality */}
        {id === 'freeze' && (
          <g>
            {/* Frozen credit card */}
            <rect x="60" y="80" width="240" height="140" rx="12" fill="white" opacity="0.9" />
            <rect x="70" y="90" width="220" height="120" rx="8" fill={`url(#gB-${id})`} />
            {/* Ice/frost effect */}
            <path d="M80 100 L90 110 L85 120 L95 130 L90 140 L100 150 L95 160 L105 170 L100 180 L110 190" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />
            <path d="M200 100 L210 110 L205 120 L215 130 L210 140 L220 150 L215 160 L225 170 L220 180 L230 190" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />
            {/* Freeze icon */}
            <circle cx="180" cy="120" r="25" fill="white" opacity="0.9" />
            <path d="M180 100 L180 140 M165 115 L195 115 M170 105 L190 135 M170 135 L190 105" stroke={accent} strokeWidth="3" fill="none" />
            {/* Temperature indicator */}
            <rect x="40" y="40" width="60" height="30" rx="6" fill="white" opacity="0.8" />
            <text x="70" y="58" textAnchor="middle" fill={accent} fontSize="14" fontWeight="bold">❄️</text>
            <text x="70" y="70" textAnchor="middle" fill="var(--muted)" fontSize="8">FROZEN</text>
          </g>
        )}
      </svg>
    );
  };

  return (
    <section aria-label="App features" className="feature-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container">
        <h2 className="carousel-title">Discover our features</h2>
        <div
          className="carousel-surface"
          role="region"
          aria-roledescription="carousel"
          aria-live="polite"
          ref={surfaceRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <button className="nav-btn prev" aria-label="Previous" onClick={goPrev}>
            <ChevronLeft size={22} />
            <AnimatePresence>
              <motion.span key={`rip-${rippleKey}-l`} className="ripple" initial={{ scale: 0, opacity: 0.35 }} animate={{ scale: 1.6, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} />
            </AnimatePresence>
          </button>
          <button className="nav-btn next" aria-label="Next" onClick={goNext}>
            <ChevronRight size={22} />
            <AnimatePresence>
              <motion.span key={`rip-${rippleKey}-r`} className="ripple" initial={{ scale: 0, opacity: 0.35 }} animate={{ scale: 1.6, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} />
            </AnimatePresence>
          </button>

          <div className="slide-viewport">
            <AnimatePresence mode="wait">
              <motion.div
                key={features[active].id}
                className="slide slide-grid"
                initial={{ opacity: 0, x: direction === 1 ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === 1 ? -30 : 30 }}
                transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ rotateX, rotateY }}
              >
                <motion.div className="slide-image-wrapper" aria-hidden style={{ rotateX: rotateXImg, rotateY: rotateYImg }}>
                  <div className="slide-image-inner">
                    <Illustration id={features[active].id} />
                  </div>
                </motion.div>

                <motion.div className="slide-copy" style={{ rotateX: rotateXText, rotateY: rotateYText }}>
                  <motion.div className="slide-icon" aria-hidden whileTap={{ scale: 0.95 }}>
                    {features[active].icon}
                  </motion.div>
                  <h3 className="slide-title">{features[active].title}</h3>
                  <p className="slide-desc">{features[active].description}</p>
                  <motion.div className="palette-bars" aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                    <span className="bar bar-1" />
                    <span className="bar bar-2" />
                    <span className="bar bar-3" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="dots" role="tablist" aria-label="Select feature">
            {features.map((f, i) => (
              <motion.button
                key={f.id}
                className={`dot ${i === active ? 'active' : ''}`}
                role="tab"
                aria-selected={i === active}
                aria-controls={`slide-${f.id}`}
                onClick={() => setActive(i)}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCarousel;