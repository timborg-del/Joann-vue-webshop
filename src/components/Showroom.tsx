import React, { useEffect, useState } from 'react';
import { getShowroomImages, ShowroomImage } from '../apiService';
import './Showroom.css'; // Import the corresponding CSS file

const Showroom: React.FC = () => {
  const [showroomImages, setShowroomImages] = useState<ShowroomImage[]>([]);

  useEffect(() => {
    const fetchShowroomImages = async () => {
      try {
        const images = await getShowroomImages();
        setShowroomImages(images);
      } catch (error) {
        console.error('Failed to fetch showroom images:', error);
      }
    };

    fetchShowroomImages();
  }, []);

  return (
    <div className="showroom-container">
      {showroomImages.map(image => (
        <div key={image.RowKey} className="showroom-image">
          <img src={image.ImageUrl} alt={image.Title} />
          <h3>{image.Title}</h3>
          <p>{image.Description}</p>
        </div>
      ))}
    </div>
  );
};

export default Showroom;






