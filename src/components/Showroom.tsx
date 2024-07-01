import React, { useEffect, useState } from 'react';
import { getShowroomImages } from '../apiService';
import './Showroom.css'; // Import CSS for showroom styling

const Showroom: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getShowroomImages();
        setImages(fetchedImages);
      } catch (err) {
        setError('Failed to fetch showroom images');
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="showroom-container">
      <h2>Showroom</h2>
      {error && <div className="error">{error}</div>}
      <div className="showroom-images">
        {images.map((image, index) => (
          <div key={index} className="showroom-image-item">
            <img src={image} alt={`Showroom ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showroom;




