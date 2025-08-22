import { useEffect, useRef } from 'react';

interface UseAnimationFrameOptions {
  enabled?: boolean;
  onFrame: (timestamp: number) => void;
}

export const useAnimationFrame = ({ enabled = true, onFrame }: UseAnimationFrameOptions) => {
  const frameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const animate = (timestamp: number) => {
      // Calculate delta time for smooth animations
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Call the animation function
      onFrame(timestamp);

      // Continue the animation loop
      frameRef.current = requestAnimationFrame(animate);
    };

    // Start the animation loop
    frameRef.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [enabled, onFrame]);

  // Pause animation when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = undefined;
        }
      } else if (enabled && !frameRef.current) {
        // Resume animation when tab becomes visible
        const animate = (timestamp: number) => {
          const deltaTime = timestamp - lastTimeRef.current;
          lastTimeRef.current = timestamp;
          onFrame(timestamp);
          frameRef.current = requestAnimationFrame(animate);
        };
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled, onFrame]);

  return {
    isAnimating: !!frameRef.current,
  };
};
