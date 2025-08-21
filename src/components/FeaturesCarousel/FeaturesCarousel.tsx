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
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    icon: "📊"
  },
  {
    id: 2,
    title: "Gestión de Presupuesto",
    description: "Crea y gestiona presupuestos personalizados para diferentes categorías de gastos y mantén el control total de tus finanzas.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    icon: "💰"
  },
  {
    id: 3,
    title: "Gestión de Deudas",
    description: "Organiza y rastrea todas tus deudas, establece planes de pago y visualiza tu progreso hacia la libertad financiera.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    icon: "📋"
  },
  {
    id: 4,
    title: "Personalización de Tarjetas",
    description: "Personaliza tus tarjetas con diseños únicos, colores y estilos que reflejen tu personalidad y preferencias.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    icon: "🎨"
  },
  {
    id: 5,
    title: "Congelar Tarjeta",
    description: "Congela instantáneamente tu tarjeta en caso de pérdida o robo para proteger tus fondos y mantener la seguridad.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    icon: "❄️"
  }
];

const FeaturesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  const goToSlide = (index: number) => {
    if (index === currentIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? features.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const createWaveEffect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const wave = document.createElement('span');
    wave.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: wave 0.6s ease-out;
      pointer-events: none;
    `;

    button.appendChild(wave);

    setTimeout(() => {
      wave.remove();
    }, 600);
  };

  return (
    <section className="features-carousel">
      <div className="carousel-container">
        <h2 className="carousel-title">Descubre nuestras funcionalidades</h2>
        
        <div className="carousel-wrapper">
          <button 
            className="carousel-button prev" 
            onClick={(e) => {
              createWaveEffect(e);
              goToPrevious();
            }}
            aria-label="Anterior funcionalidad"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="carousel-slides-container">
            <div 
              className="carousel-slide active"
              style={{
                transform: `translateX(-${currentIndex * 100}%) rotateY(${isTransitioning ? 15 : 0}deg)`,
                opacity: isTransitioning ? 0.8 : 1
              }}
            >
              <div className="slide-content">
                <div className="slide-image">
                  <img 
                    src={features[currentIndex].image} 
                    alt={features[currentIndex].title}
                    loading="lazy"
                  />
                  <div className="image-overlay"></div>
                </div>
                
                <div className="slide-info">
                  <div className="feature-icon">
                    {features[currentIndex].icon}
                  </div>
                  <h3 className="feature-title">
                    {features[currentIndex].title}
                  </h3>
                  <p className="feature-description">
                    {features[currentIndex].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            className="carousel-button next" 
            onClick={(e) => {
              createWaveEffect(e);
              goToNext();
            }}
            aria-label="Siguiente funcionalidad"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="carousel-indicators">
          {features.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a funcionalidad ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="carousel-progress">
          <div 
            className="progress-bar" 
            style={{ width: `${((currentIndex + 1) / features.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;
