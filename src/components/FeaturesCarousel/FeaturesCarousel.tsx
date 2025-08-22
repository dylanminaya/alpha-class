import React, { useState, useEffect } from 'react';
import './FeaturesCarousel.css';

// Feature data structure
interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Expense Control",
    description: "Track and manage your spending history with detailed analytics and insights to make better financial decisions.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    category: "expense-control"
  },
  {
    id: 2,
    title: "Budget Management",
    description: "Create and manage personalized budgets to stay on track with your financial goals and spending limits.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    category: "budget-management"
  },
  {
    id: 3,
    title: "Debt Management",
    description: "Organize and track your debts with smart payment reminders and debt payoff strategies.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    category: "debt-management"
  },
  {
    id: 4,
    title: "Card Customization",
    description: "Personalize your cards with custom designs, colors, and features that match your style and preferences.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
    category: "card-customization"
  },
  {
    id: 5,
    title: "Card Freeze",
    description: "Instantly freeze your card for security when needed and unfreeze it just as quickly when you're ready to use it.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    category: "card-freeze"
  }
];

const FeaturesCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <section className="features-carousel-section">
      <div className="features-carousel-container">
        <div className="features-header">
          <h2 className="features-title">Powerful Features for Your Financial Success</h2>
          <p className="features-subtitle">
            Everything you need to manage your finances like a pro
          </p>
        </div>
        
        <div className="custom-carousel">
          <button 
            className="carousel-button carousel-button-prev" 
            onClick={goToPrevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>
          
          <div className="carousel-slides">
            {features.map((feature, index) => (
              <div 
                key={feature.id} 
                className={`feature-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
              >
                <div className="feature-card">
                  <div className="feature-image-container">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="feature-image"
                      loading="lazy"
                    />
                    <div className="feature-overlay"></div>
                  </div>
                  <div className="feature-content">
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                    <div className="feature-category">
                      <span className="category-tag">{feature.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="carousel-button carousel-button-next" 
            onClick={goToNextSlide}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
        
        <div className="carousel-pagination">
          {features.map((_, index) => (
            <button
              key={index}
              className={`pagination-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="carousel-indicators">
          <span className="indicator-text">
            {currentSlide + 1} of {features.length}
          </span>
        </div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;
