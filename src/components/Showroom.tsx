import React, { useEffect, useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import { ShowroomImage } from '../apiService';
import './Showroom.css'; // Import CSS file for styling

interface ShowroomProps {
  onImageClick: (productName: string) => void;
}

const Showroom: React.FC<ShowroomProps> = ({ onImageClick }) => {
  const { data: images, isLoading, error } = useFetchData<ShowroomImage[]>('https://joart.azurewebsites.net/GetShowroomImages');
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (images && images.length > 0) {
      setIsContainerVisible(true);
      // Gradually make images visible
      images.forEach((image, index) => {
        setTimeout(() => {
          setVisibleImages(prev => new Set(prev).add(image.RowKey));
        }, index * 100); // Stagger the fade-in effect
      });
    }
  }, [images]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching showroom images:", error);
    return <div>Error: {error.message}</div>;
  }

  if (!Array.isArray(images)) {
    console.error("Unexpected data format:", images);
    return <div>Error: Unexpected data format</div>;
  }

  return (
    <div className={`showroom-container ${isContainerVisible ? 'visible' : ''}`}>
      {images.length > 0 ? (
        images.map((image) => (
          <div key={image.RowKey} className={`showroom-image ${visibleImages.has(image.RowKey) ? 'visible' : ''}`}>
            <img
              src={image.ImageUrl}
              alt={image.Title}
              onClick={() => onImageClick(image.Title)}
            />
            <p>{image.Title}</p>
          </div>
        ))
      ) : (
        <div>No images available</div>
      )}
    </div>
  );
};

export default Showroom;















