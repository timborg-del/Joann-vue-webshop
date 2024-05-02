import React from 'react';
import { CartItemProps } from './CartItems';
import useCartActions from '../hooks/useCartActions'; // Import useCartActions hook

const Product: React.FC<CartItemProps> = ({ id, name, price, quantity }: CartItemProps) => {
  const { addItemToCart } = useCartActions(); // Access addItemToCart function from useCartActions hook

  return (
    <div>
      <p>Key: {id}</p>
      <p>Name: {name}</p>
      <p>Price: ${price}</p>
      <p>Quantity: {quantity}</p>
      <button onClick={() => addItemToCart({ id, name, price, quantity: 1 })}>Add to Cart</button>
    </div>
  );
};

export default Product;
