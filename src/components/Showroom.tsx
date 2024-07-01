import React, { useEffect, useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import { ShowroomImage } from '../apiService';
import './Showroom.css'; // Import CSS file for styling

interface ShowroomProps {
  onImageClick: (productName: string) => void;
}

const Showroom: React.FC<ShowroomProps> = ({ onImageClick }) => {
  const { data: images, isLoading, error } = useFetchData<ShowroomImage[]>('https://joart.azurewebsites.net/GetShowroomImages');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (images && images.length > 0) {
      setIsVisible(true);
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
    <div className={`showroom-container ${isVisible ? 'visible' : ''}`}>
      {images.length > 0 ? (
        images.map((image) => (
          <div key={image.RowKey} className={`showroom-image ${isVisible ? 'visible' : ''}`}>
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















