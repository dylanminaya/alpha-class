import React, { useState, useEffect } from 'react';
import './FeaturesCarousel.css';

interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Control de Gastos",
    description: "Mantén un historial detallado de todos tus gastos y analiza tus patrones de consumo para tomar mejores decisiones financieras.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    icon: "📊"
  },
  {
    id: 2,
    title: "Gestión de Presupuesto",
    description: "Crea y gestiona presupuestos personalizados para diferentes categorías y mantén el control total de tus finanzas.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    icon: "💰"
  },
  {
    id: 3,
    title: "Gestión de Deudas",
    description: "Organiza y rastrea todas tus deudas con recordatorios inteligentes y estrategias de pago personalizadas.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    icon: "📋"
  },
  {
    id: 4,
    title: "Personalización de Tarjetas",
    description: "Personaliza tus tarjetas con diseños únicos y colores que reflejen tu estilo personal.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    icon: "🎨"
  },
  {
    id: 5,
    title: "Congelar Tarjeta",
    description: "Congela tu tarjeta instantáneamente desde la app en caso de pérdida o uso no autorizado para mayor seguridad.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    icon: "❄️"
  }
];

const FeaturesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 5 seconds of manual interaction
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? features.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % features.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <section className="features-carousel">
      <div className="carousel-container">
        <h2 className="carousel-title">Descubre nuestras funcionalidades</h2>
        
        <div className="carousel-wrapper">
          <button className="carousel-button prev" onClick={goToPrevious}>
            ‹
          </button>
          
          <div className="carousel-slide">
            <div className="feature-content">
              <div className="feature-image">
                <img 
                  src={features[currentIndex].image} 
                  alt={features[currentIndex].title}
                  className="feature-img"
                />
                <div className="feature-overlay">
                  <span className="feature-icon">{features[currentIndex].icon}</span>
                </div>
              </div>
              
              <div className="feature-info">
                <h3 className="feature-title">{features[currentIndex].title}</h3>
                <p className="feature-description">{features[currentIndex].description}</p>
              </div>
            </div>
            
            {/* Progress bar for auto-slide */}
            {isAutoPlaying && (
              <div className="carousel-progress">
                <div className="carousel-progress-bar"></div>
              </div>
            )}
          </div>
          
          <button className="carousel-button next" onClick={goToNext}>
            ›
          </button>
        </div>
        
        <div className="carousel-indicators">
          {features.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;
