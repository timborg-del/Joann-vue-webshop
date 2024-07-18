import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import CSS file for Home styles
import Showroom from '../components/Showroom'; // Import the Showroom component
import CommentsComponent from '../components/CommentsComponent'; // Import the CommentsComponent
import margo from '../assets/Margo_Gif_02.gif'; // Import the GIF file
import { incrementVisitCount } from '../apiService'; // Import the incrementVisitCount function

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [, setVisitCount] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the transition after the component mounts
    setIsVisible(true);

    const hasVisited = sessionStorage.getItem('hasVisitedHomePage');
    if (!hasVisited) {
      const incrementAndFetchVisitCount = async () => {
        try {
          const count = await incrementVisitCount();
          setVisitCount(count);
          sessionStorage.setItem('hasVisitedHomePage', 'true');
        } catch (error) {
          console.error("Error incrementing visit count:", error);
        }
      };

      incrementAndFetchVisitCount();
    }
  }, []);

  const handleImageClick = (productName: string) => {
    const imageSection = document.querySelector('.image-section');
    if (imageSection) {
      imageSection.classList.add('fade-out');
    }

    setTimeout(() => {
      navigate(`/shoppage?product=${productName}`);
    }, 500); // Match the timeout duration with the CSS transition duration
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
          <CommentsComponent /> {/* Add the CommentsComponent here */}
        </div>
        <div className="image-section">
          <Showroom onImageClick={handleImageClick} /> {/* Add the Showroom component here */}
        </div>
        <div className="gif-container">
          <img src={margo} alt="Margo Gif" />
        </div>
      </div>
    </div>
  );
};

export default Home;
