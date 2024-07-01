import { useEffect, useState } from 'react';
import './Home.css'; // Import CSS file for Home styles
import Showroom from '../components/Showroom'; // Import the Showroom component

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the transition after the component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className="home-container">
      <h2>Welcome</h2>
      <div className={`home-content ${isVisible ? 'visible' : ''}`}>
        <p>
          This is the homepage of your online store. You can provide a brief introduction to your store,
          showcase featured products, or include any other relevant information here.
        </p>
      </div>
      <Showroom /> {/* Add the Showroom component here */}
    </div>
  );
};

export default Home;





