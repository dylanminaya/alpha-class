import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useAnimationFrame } from '../hooks/useAnimationFrame';
import './StarfieldBackground.css';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  opacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
  glow: number;
  color: string;
}

interface StarfieldBackgroundProps {
  className?: string;
}

const StarfieldBackground: React.FC<StarfieldBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  const stars = useRef<Star[]>([]);
  const shootingStars = useRef<ShootingStar[]>([]);
  const lastShootingStarTime = useRef<number>(0);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Check if device is desktop for mouse parallax
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth > 768 && !('ontouchstart' in window));
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Handle mouse movement for parallax effect
  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mousePosition.current = {
          x: (event.clientX - rect.left) / rect.width,
          y: (event.clientY - rect.top) / rect.height,
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop, prefersReducedMotion]);

  // Initialize stars
  const initializeStars = useCallback((width: number, height: number) => {
    const starCount = Math.min(300, Math.floor((width * height) / 10000));
    stars.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 1000 + 200,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.8 + 0.3,
      opacity: Math.random() * 0.9 + 0.1,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.04 + 0.02,
      color: Math.random() > 0.7 ? 'cyan' : Math.random() > 0.5 ? 'purple' : 'white',
    }));
  }, []);

  // Create shooting star
  const createShootingStar = useCallback((width: number, height: number) => {
    // Start from top-left area and fall diagonally
    const x = Math.random() * width * 0.9;
    const y = Math.random() * height * 0.15;
    const angle = Math.PI / 4 + (Math.random() - 0.5) * Math.PI / 6;
    const speed = Math.random() * 4 + 3;
    const length = Math.random() * 80 + 60;
    
    shootingStars.current.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      maxLife: Math.random() * 100 + 80,
      length,
      glow: Math.random() * 0.8 + 0.2,
      color: Math.random() > 0.5 ? 'pink' : 'cyan',
    });
  }, []);

  // Handle resize
  const handleResize = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    setDimensions({ width, height });

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvasRef.current.width = width * dpr;
    canvasRef.current.height = height * dpr;
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;

    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    initializeStars(width, height);
  }, [initializeStars]);

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    if (!canvasRef.current || prefersReducedMotion) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;

    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Update and draw stars
    stars.current.forEach((star) => {
      // Update star position
      star.z -= star.speed;
      if (star.z < 1) {
        star.z = 1000 + Math.random() * 200;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      }

      // Calculate screen position with parallax
      let x = (star.x - width / 2) * (1000 / star.z) + width / 2;
      let y = (star.y - height / 2) * (1000 / star.z) + height / 2;

      // Add mouse parallax effect
      if (isDesktop && !prefersReducedMotion) {
        const parallaxX = (mousePosition.current.x - 0.5) * 15;
        const parallaxY = (mousePosition.current.y - 0.5) * 15;
        x += parallaxX * (1000 / star.z);
        y += parallaxY * (1000 / star.z);
      }

      const size = star.size * (1000 / star.z);
      
      // Twinkle effect
      star.twinklePhase += star.twinkleSpeed;
      const twinkle = Math.sin(star.twinklePhase) * 0.4 + 0.6;
      const opacity = star.opacity * (1000 / star.z) * twinkle;

      if (x >= 0 && x <= width && y >= 0 && y <= height && size > 0) {
        // Get star color
        let starColor = '#ffffff';
        let glowColor = '#00e5ff';
        
        if (star.color === 'cyan') {
          starColor = '#00e5ff';
          glowColor = '#00e5ff';
        } else if (star.color === 'purple') {
          starColor = '#8b5cf6';
          glowColor = '#a855f7';
        }
        
        // Draw star with modern glow effect
        ctx.save();
        ctx.globalAlpha = opacity * 0.5;
        ctx.fillStyle = glowColor;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = size * 2;
        ctx.beginPath();
        ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw star core
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = starColor;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = size;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });

    // Create shooting stars more frequently and consistently
    if (timestamp - lastShootingStarTime.current > Math.random() * 1200 + 600) {
      createShootingStar(width, height);
      lastShootingStarTime.current = timestamp;
    }

    // Update and draw shooting stars
    shootingStars.current = shootingStars.current.filter((star) => {
      star.x += star.vx;
      star.y += star.vy;
      star.life--;

      if (star.life <= 0 || star.x < 0 || star.x > width || star.y < 0 || star.y > height) {
        return false;
      }

      const lifeRatio = star.life / star.maxLife;
      const opacity = lifeRatio * star.glow;
      const length = star.length * lifeRatio;

             // Get shooting star color
      let shootingStarColor = '#ec4899';
      let shootingGlowColor = '#ec4899';
      
      if (star.color === 'cyan') {
        shootingStarColor = '#00e5ff';
        shootingGlowColor = '#00e5ff';
      }
      
      // Draw shooting star with modern glow
      ctx.save();
      ctx.globalAlpha = opacity * 0.7;
      ctx.strokeStyle = shootingGlowColor;
      ctx.lineWidth = 5;
      ctx.shadowColor = shootingGlowColor;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(star.x - star.vx * length, star.y - star.vy * length);
      ctx.stroke();
      ctx.restore();

      // Draw shooting star core
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = shootingStarColor;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = shootingGlowColor;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(star.x - star.vx * length, star.y - star.vy * length);
      ctx.stroke();
      ctx.restore();

      return true;
    });
  }, [dimensions, prefersReducedMotion, isDesktop, createShootingStar]);

  // Use animation frame hook
  useAnimationFrame({
    enabled: !prefersReducedMotion,
    onFrame: animate,
  });

  // Handle resize
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <div ref={containerRef} className={`starfield-container ${className}`}>
      <canvas
        ref={canvasRef}
        className="starfield-canvas"
        aria-hidden="true"
      />
      <div className="starfield-gradient-overlay" />
    </div>
  );
};

export default StarfieldBackground;
