import React from 'react';
import Product from '../components/Products'; // Import the Product component
import './ShopPage.css'; // Import the corresponding CSS file

const ShopPage: React.FC = () => {
  return (
    <div className="shop-container">
      <h1>Shop</h1>
      <Product />
    </div>
  );
};

export default ShopPage;



