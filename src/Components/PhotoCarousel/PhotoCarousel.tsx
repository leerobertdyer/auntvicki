import { useState } from "react";
import "./PhotoCarousel.css";

interface PhotoCarouselProps {
  photos: string[];
  alt?: string;
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos, alt = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasMultiplePhotos = photos.length > 1;

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  if (photos.length === 0) {
    return <div className="carousel-placeholder">No image available</div>;
  }

  return (
    <div className="carousel-container">
      <div className="carousel-image-wrapper">
        <img
          src={photos[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          className="carousel-image"
        />

        {hasMultiplePhotos && (
          <>
            <button
              className="carousel-arrow carousel-arrow-left"
              onClick={goToPrev}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              className="carousel-arrow carousel-arrow-right"
              onClick={goToNext}
              aria-label="Next photo"
            >
              ›
            </button>
          </>
        )}
      </div>

      {hasMultiplePhotos && (
        <div className="carousel-dots">
          {photos.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToIndex(index)}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoCarousel;

