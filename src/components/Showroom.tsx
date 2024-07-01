import React from 'react';
import useFetchData from '../hooks/useFetchData'; // Adjust the import path as necessary
import { Product } from '../apiService';
import './Showroom.css'; // Import CSS file for styling

const Showroom: React.FC = () => {
  const { data: products, isLoading, error } = useFetchData<Product[]>('https://joart.azurewebsites.net/GetProducts');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="showroom-container">
      <h2>Showroom</h2>
      <div className="products-grid">
        {products?.map(product => (
          <div key={product.RowKey} className="product-card">
            <img src={product.ImageUrl} alt={product.Name} className="product-image" />
            <div className="product-details">
              <h3>{product.Name}</h3>
              <p>{product.Price} SEK</p>
              <p>{product.Category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showroom;


