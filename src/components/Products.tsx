import React from 'react';
import { CartItemProps } from './CartItems';
import useCartActions from '../hooks/useCartActions'; // Import useCartActions hook
import joannJpg from '../assets/joann.jpg';
import './Products.css'; // Import the corresponding CSS file

const Products: React.FC = () => {
  const { addItemToCart } = useCartActions(); // Access addItemToCart function from useCartActions hook

  // Dummy data for demonstration
  const products: (CartItemProps & { productImage: string })[] = [
    { id: '1', name: 'Product 1', price: 10, quantity: 1, productImage: joannJpg },
    { id: '2', name: 'Product 2', price: 15, quantity: 1, productImage: joannJpg },
    { id: '3', name: 'Product 3', price: 20, quantity: 1, productImage: joannJpg }
  ];

  return (
    <div className='container'>
    <div className="products-container">
      {products.map((product) => (
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






