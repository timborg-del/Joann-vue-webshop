import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import CSS file for Home styles
import Showroom from '../components/Showroom'; // Import the Showroom component

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the transition after the component mounts
    setIsVisible(true);
  }, []);

  const handleImageClick = (productName: string) => {
    navigate(`/shoppage?product=${productName}`);
  };

  return (
    <div className={`home-container ${isVisible ? 'visible' : ''}`}>
      <h2>Welcome</h2>
      <div className="home-content">
        <div className="intro-text">
          <h1>Welcome to Jo's Art Shop</h1>
          <p>
            Hey there! We're glad you stopped by. At Jo's Art Shop, you'll find a variety of unique and beautiful artworks. Whether you're looking for something to brighten up your home or a special gift for someone, we've got you covered. Take a look around and find something you love!
          </p>
        </div>
        <div className="image-section">
          <Showroom onImageClick={handleImageClick} /> {/* Add the Showroom component here */}
        </div>
      </div>
    </div>
  );
};

export default Home;













