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
    navigate(`/shop?product=${productName}`);
  };

  return (
    <div className="home-container">
      <h2>Welcome</h2>
      <div className={`home-content ${isVisible ? 'visible' : ''}`}>
        <p>
          This is the homepage of your online store. You can provide a brief introduction to your store,
          showcase featured products, or include any other relevant information here.
        </p>
      </div>
      <Showroom onImageClick={handleImageClick} /> {/* Add the Showroom component here */}
    </div>
  );
};

export default Home;










