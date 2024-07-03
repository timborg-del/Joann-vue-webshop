import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Product from '../components/Products'; // Ensure the correct path and file name for the Product component
import './ShopPage.css'; // Import the corresponding CSS file

const ShopPage: React.FC = () => {
  const location = useLocation();
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productName = params.get('product');
    if (productName) {
      setActiveProduct(productName);
    }
  }, [location]);

  return (
    <div className="shop-container">
      <h1>Shop</h1>
      <Product activeProductName={activeProduct} />
    </div>
  );
};

export default ShopPage;








