import React from 'react';
import { CartItemProps } from './CartItems';
import useCartActions from '../hooks/useCartActions'; // Import useCartActions hook
import joannJpg from '../assets/joann.jpg'

const Product: React.FC<CartItemProps & { productImage: string }> = () => {
  const { addItemToCart } = useCartActions(); // Access addItemToCart function from useCartActions hook

  // Dummy data for demonstration
  const products: (CartItemProps & { productImage: string })[] = [
    { id: '1', name: 'Product 1', price: 10, quantity: 1, productImage: joannJpg },
    { id: '2', name: 'Product 2', price: 15, quantity: 1, productImage: joannJpg },
    { id: '3', name: 'Product 3', price: 20, quantity: 1, productImage: joannJpg }
  ];

  return (
    <div className="shop-container"> {/* Container for the cards */}
      {products.map((product) => (
        <div key={product.id} className="card"> {/* Add className "card" here */}
          <img src={product.productImage} alt={product.name} style={{ width: '100%', borderRadius: '10px' }} /> {/* Fit the image to the card */}
          <div className="product-details">
      
            <p>Name: {product.name}</p>
            <p>Price: ${product.price}</p>
            
            <button className='buy_btn' onClick={() => addItemToCart({ productImage: product.productImage, id: product.id, name: product.name, price: product.price, quantity: 1 })}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;





