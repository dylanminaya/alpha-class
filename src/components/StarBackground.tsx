import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './StarBackground.css';

const StarBackground: React.FC = () => {
  // Generate random stars
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      });
    }
    return stars;
  };

  const stars = generateStars();

  return (
    <div className="star-background">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star size={star.size} />
        </motion.div>
      ))}
      
      {/* Special bright stars */}
      <motion.div
        className="star bright-star"
        style={{ left: '20%', top: '30%' }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.5, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Star size={4} />
      </motion.div>

      <motion.div
        className="star bright-star"
        style={{ left: '80%', top: '70%' }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.3, 1],
          rotate: [360, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Star size={3} />
      </motion.div>

      <motion.div
        className="star bright-star"
        style={{ left: '60%', top: '20%' }}
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.4, 0.8],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Star size={5} />
      </motion.div>

      {/* Shooting stars */}
      <motion.div
        className="shooting-star"
        style={{ left: '0%', top: '10%' }}
        animate={{
          x: [0, 1000],
          y: [0, 200],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "easeIn",
        }}
      >
        <div className="shooting-star-trail"></div>
        <Star size={2} />
      </motion.div>

      <motion.div
        className="shooting-star"
        style={{ left: '100%', top: '80%' }}
        animate={{
          x: [0, -1000],
          y: [0, -200],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 10,
          ease: "easeIn",
        }}
      >
        <div className="shooting-star-trail"></div>
        <Star size={2} />
      </motion.div>
    </div>
  );
};

export default StarBackground;
