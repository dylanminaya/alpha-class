import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, History, Wallet, CreditCard, Snowflake, Palette } from 'lucide-react';
import './FeatureCarousel.css';

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
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
      icon: <History size={32} />,
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&crop=center',
    },
    {
      id: 'budget',
      title: 'Budget creation and management',
      description: 'Set smart budgets and stay on track with helpful nudges.',
      icon: <Wallet size={32} />,
      imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop&crop=center',
    },
    {
      id: 'debt',
      title: 'Debt management',
      description: 'Plan repayments and visualize progress towards zero debt.',
      icon: <CreditCard size={32} />,
      imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&crop=center',
    },
    {
      id: 'personalize',
      title: 'Card personalization',
      description: 'Customize your card style to match your personality.',
      icon: <Palette size={32} />,
      imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&crop=center',
    },
    {
      id: 'freeze',
      title: 'Freeze card functionality',
      description: 'Instantly freeze/unfreeze your card for peace of mind.',
      icon: <Snowflake size={32} />,
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&crop=center',
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
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);
  const rotateX = useTransform(springY, [0, 1], [4, -4]);

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

  const handleImageError = (id: string) => {
    setFailedImageById(prev => ({ ...prev, [id]: true }));
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
                className="slide slide-overlay"
                initial={{ opacity: 0, x: direction === 1 ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === 1 ? -30 : 30 }}
                transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ rotateX, rotateY }}
              >
                {/* Background Image */}
                <div className="slide-background">
                  {!failedImageById[features[active].id] ? (
                    <img
                      src={features[active].imageUrl}
                      alt=""
                      className="background-image"
                      onError={() => handleImageError(features[active].id)}
                    />
                  ) : (
                    <div className="image-fallback">
                      <div className="fallback-icon">
                        {features[active].icon}
                      </div>
                      <span>Image unavailable</span>
                    </div>
                  )}
                  {/* Gradient Overlay */}
                  <div className="background-overlay" />
                </div>

                {/* Content Overlay */}
                <div className="slide-content">
                  <motion.div 
                    className="slide-icon" 
                    aria-hidden 
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    {features[active].icon}
                  </motion.div>
                  
                  <motion.h3 
                    className="slide-title"
                    data-text={features[active].title}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {features[active].title}
                  </motion.h3>
                  
                  <motion.p 
                    className="slide-desc"
                    data-text={features[active].description}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    {features[active].description}
                  </motion.p>
                  
                  <motion.div 
                    className="palette-bars" 
                    aria-hidden 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <span className="bar bar-1" />
                    <span className="bar bar-2" />
                    <span className="bar bar-3" />
                  </motion.div>
                </div>
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