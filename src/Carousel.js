import React, { useState, useEffect, useCallback } from 'react';
import './Carousel.css'

const Carousel = ({ slides, autoPlayInterval = 5000 }) => {
  // Default slides using your images
  const defaultSlides = [
    {
      image: 'https://plus.unsplash.com/premium_photo-1770382881955-1436023dd952?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGludGVybnNoaXAlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
      caption: {
        title: 'Global Internship Opportunities',
        description: 'Connect with top companies worldwide'
      }
    },
    {
      image: 'https://images.unsplash.com/photo-1659080926109-2bfa668330c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGludGVybnNoaXAlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
      caption: {
        title: 'Tech Networking',
        description: 'Build your professional circle'
      }
    },
    {
      image: 'https://plus.unsplash.com/premium_photo-1682145181120-73cfdfc8a36d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW50ZXJuc2hpcCUyMGNvbXB1dGVyJTIwbmV0d29ya2luZyUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
      caption: {
        title: 'Computer Networking',
        description: 'Master the backbone of IT infrastructure'
      }
    },
    {
      image: 'https://images.unsplash.com/photo-1546124404-9e7e3cac2ec1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW50ZXJuc2hpcCUyMGNvbXB1dGVyJTIwbmV0d29ya2luZyUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
      caption: {
        title: 'Future-Ready Skills',
        description: 'Prepare for tomorrow’s challenges today'
      }
    }
  ];

  // Use provided slides or fallback to defaults
  const effectiveSlides = slides && slides.length > 0 ? slides : defaultSlides;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const totalSlides = effectiveSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, autoPlayInterval]);

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  // No slides fallback (should never happen because we have defaults)
  if (totalSlides === 0) {
    return <div className="carousel-empty">No slides available</div>;
  }

  return (
    <div
      className="carousel"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      <div className="carousel-slides">
        {effectiveSlides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
          >
            <img src={slide.image} alt={slide.caption?.title || `Slide ${index + 1}`} />
            {slide.caption && (
              <div className="carousel-caption">
                <h3>{slide.caption.title}</h3>
                <p>{slide.caption.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="carousel-arrow prev" onClick={prevSlide} aria-label="Previous slide">
        &#10094;
      </button>
      <button className="carousel-arrow next" onClick={nextSlide} aria-label="Next slide">
        &#10095;
      </button>

      <div className="carousel-dots">
        {effectiveSlides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;