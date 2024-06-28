import React from 'react';
import './StarRating.css';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="star-rating">
      {Array.from({ length: totalStars }, (_, index) => (
        <span key={index} className={index < rating ? 'filled' : ''}>&#9733;</span>
      ))}
    </div>
  );
};

export default StarRating;
