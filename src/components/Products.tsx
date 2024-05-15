import React from 'react';
import { CartItemProps } from './CartItems';
import useCartActions from '../hooks/useCartActions'; // Import useCartActions hook
import './Products.css'; // Import the corresponding CSS file
import useFetchData from '../hooks/useFetchData'; // Import the useFetchData hook

const Products: React.FC = () => {
  const { addItemToCart } = useCartActions(); // Access addItemToCart function from useCartActions hook
  const { data: products, isLoading, error } = useFetchData('http://localhost:7203/api/products'); // Fetch products data

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Explicitly specify the type of products
  const productsArray: (CartItemProps & { productImage: string })[] = products || [];

  return (
    <div className='container'>
      <div className="products-container">
        {productsArray.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.productImage} alt={product.name} className="product-image" />
            <div className="product-details">
              <p>{product.name}</p>
              <p>${product.price}</p>
              <button className="buy-btn" onClick={() => addItemToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;









