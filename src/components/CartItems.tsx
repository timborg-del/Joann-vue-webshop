import React from 'react';

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  productImage: string; // Assuming productImage is a URL
  quantity: number;
}

const CartItems = ({ id, name, price, productImage, quantity }: CartItemProps) => (
  <div>
    
    <p>{name}</p>
    <p>${price}</p>
    <img 
      src={productImage} 
      alt={name} 
      style={{
        width: '20%',
        height: 'auto',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
      }} 
    /> {/* Render the image */}
    <p>Quantity: {quantity}</p>
  </div>
);

export default CartItems;




