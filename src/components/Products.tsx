import React, { useEffect } from 'react';
import { CartItemProps } from './CartItems';
import useCartActions from '../hooks/useCartActions'; // Import useCartActions hook
import './Products.css'; // Import the corresponding CSS file
import useFetchData from '../hooks/useFetchData'; // Import the useFetchData hook

// Define the Product interface
export interface Product {
  PartitionKey: string;
  RowKey: string;
  Name: string;
  Price: number;
  Stock: number;
  Category: string;
  ProductImageBase64: string;
}

const Products: React.FC = () => {
  const { addItemToCart } = useCartActions(); // Access addItemToCart function from useCartActions hook
  const { data, isLoading, error } = useFetchData('https://joart.azurewebsites.net/GetProducts'); // Fetch products data

  useEffect(() => {
    if (data) {
      console.log("Fetched data:", data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Check if data is an array
  if (!Array.isArray(data)) {
    return <div>Error: Unexpected data format</div>;
  }

  const productsArray: (CartItemProps & Product)[] = data;

  return (
    <div className='container'>
      <div className="products-container">
        {productsArray.length > 0 ? (
          productsArray.map((product) => (
            <div key={product.RowKey} className="product-card">
              <img src={product.ProductImageBase64} alt={product.Name} className="product-image" />
              <div className="product-details">
                <p>{product.Name}</p>
                <p>${product.Price}</p>
                <button className="buy-btn" onClick={() => addItemToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
};

export default Products;












