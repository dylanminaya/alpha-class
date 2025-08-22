import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  Play
} from 'lucide-react';
import './Hero.css';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const phoneVariants = {
    hidden: { opacity: 0, rotate: -15, scale: 0.8 },
    visible: {
      opacity: 1,
      rotate: 5,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-text">
            <motion.h1 
              className="hero-headline"
              variants={itemVariants}
            >
              economymanager for{' '}
              <span className="gradient-text">independents</span>
            </motion.h1>
            
            <motion.p 
              className="hero-subheadline"
              variants={itemVariants}
            >
              Get paid faster and manage your finances effortlessly. Perfect for freelancers seeking a seamless financial solution.
            </motion.p>
            
            <motion.div 
              className="hero-features"
              variants={itemVariants}
            >
              <div className="feature-item">
                <Shield size={20} />
                <span>Secure Payments</span>
              </div>
              <div className="feature-item">
                <TrendingUp size={20} />
                <span>Smart Analytics</span>
              </div>
              <div className="feature-item">
                <Zap size={20} />
                <span>Instant Transfers</span>
              </div>
            </motion.div>

            <motion.div 
              className="hero-actions"
              variants={itemVariants}
            >
              <motion.button 
                className="hero-cta primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Start Free Trial
                <ArrowRight size={20} />
              </motion.button>
              
              <motion.button 
                className="hero-cta secondary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Play size={20} />
                Watch Demo
              </motion.button>
            </motion.div>

            <motion.div 
              className="hero-stats"
              variants={itemVariants}
            >
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">$2M+</span>
                <span className="stat-label">Processed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="hero-visual"
            variants={phoneVariants}
          >
            <motion.div 
              className="phone-mockup"
              variants={floatingVariants}
              animate="animate"
            >
              <div className="phone-screen">
                <div className="phone-header">
                  <div className="status-bar">
                    <span className="time">9:41</span>
                    <div className="signal-battery">
                      <span className="signal">●●●</span>
                      <span className="battery">100%</span>
                    </div>
                  </div>
                </div>
                
                <div className="app-content">
                  <motion.div 
                    className="app-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    <h2 className="app-title">Dashboard</h2>
                    <div className="app-subtitle">Welcome back, Alex!</div>
                  </motion.div>

                  <motion.div 
                    className="balance-card"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    <div className="balance-header">
                      <DollarSign size={24} />
                      <span>Total Balance</span>
                    </div>
                    <div className="balance-amount">$8,420.50</div>
                    <div className="balance-change positive">
                      <TrendingUp size={16} />
                      +12.5% from last month
                    </div>
                  </motion.div>

                  <motion.div 
                    className="quick-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                  >
                    <div className="action-btn">
                      <span>Send</span>
                    </div>
                    <div className="action-btn">
                      <span>Request</span>
                    </div>
                    <div className="action-btn">
                      <span>Invest</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="recent-transaction"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                  >
                    <div className="transaction-icon">
                      <TrendingUp size={16} />
                    </div>
                    <div className="transaction-details">
                      <span className="transaction-name">Freelance Payment</span>
                      <span className="transaction-time">2 hours ago</span>
                    </div>
                    <span className="transaction-amount positive">+$450</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div 
              className="floating-element element-1"
              animate={{ 
                y: [-20, 20, -20],
                rotate: [0, 5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <DollarSign size={24} />
            </motion.div>

            <motion.div 
              className="floating-element element-2"
              animate={{ 
                y: [20, -20, 20],
                rotate: [0, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
            >
              <TrendingUp size={24} />
            </motion.div>

            <motion.div 
              className="floating-element element-3"
              animate={{ 
                y: [-15, 15, -15],
                rotate: [0, 3, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2
              }}
            >
              <Shield size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
