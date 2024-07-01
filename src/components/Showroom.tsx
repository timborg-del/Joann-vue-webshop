import React, { useEffect, useState } from 'react';
import { getShowroomImages, ShowroomImage } from '../apiService';
import './Showroom.css'; // Import the corresponding CSS file

const Showroom: React.FC = () => {
  const [showroomImages, setShowroomImages] = useState<ShowroomImage[]>([]);
  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchShowroomImages = async () => {
      try {
        const images = await getShowroomImages();
        setShowroomImages(images);

        // Trigger visibility for all images after they are loaded
        setTimeout(() => {
          setVisibleImages(new Set(images.map(image => image.RowKey)));
        }, 100); // Delay to allow the images to render before transitioning
      } catch (error) {
        console.error('Failed to fetch showroom images:', error);
      }
    };

    fetchShowroomImages();
  }, []);

  return (
    <div className="showroom-container">
      {showroomImages.map(image => (
        <div key={image.RowKey} className={`showroom-image ${visibleImages.has(image.RowKey) ? 'visible' : ''}`}>
          <img src={image.ImageUrl} alt={image.Title} />
          <h3>{image.Title}</h3>
          <p>{image.Description}</p>
        </div>
      ))}
    </div>
  );
};

export default Showroom;






