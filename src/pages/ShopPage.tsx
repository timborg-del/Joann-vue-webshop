import{ useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Product from '../components/Products'; // Import the Product component
import './ShopPage.css'; // Import the corresponding CSS file

const ShopPage: React.FC = () => {
  const location = useLocation();
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productName = params.get('product');
    if (productName) {
      setActiveProduct(productName);
    }

    // Trigger the transition effect after the component mounts
    setIsVisible(true);
  }, [location]);

  return (
    <div className={`shop-container`}>
      <h1>Shop</h1>
        <Product activeProductName={activeProduct} />
      </div>
  );
};

export default ShopPage;







