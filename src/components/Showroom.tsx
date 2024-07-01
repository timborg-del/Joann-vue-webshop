import React, { useEffect, useState } from 'react';
import { ShowroomImage, getShowroomImages } from '../apiService';
import './Showroom.css';

const Showroom: React.FC = () => {
  const [images, setImages] = useState<ShowroomImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getShowroomImages();
        setImages(images);
      } catch (err) {
        setError('Failed to fetch showroom images');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="showroom">
      {images.map((image) => (
        <div key={image.RowKey} className="showroom-image-card">
          <img src={image.ImageUrl} alt={image.Title} className="showroom-image" />
          <div className="showroom-image-info">
            <h3>{image.Title}</h3>
            <p>{image.Description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Showroom;




