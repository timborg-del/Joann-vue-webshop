import React from 'react';

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  productImage: string; // Assuming productImage is a URL
  quantity: number;
  size?: string;
}

const CartItems: React.FC<CartItemProps> = ({ name, price, productImage, quantity, size }) => (
  <div className="cart-items-prop">
    <img src={productImage} alt={name} onError={(e) => { e.currentTarget.src = '/path/to/placeholder-image.jpg'; }} />
    <div>
      <p>{name}</p>
      <p>{size}</p>
      <p>${price.toFixed(2)}</p>
      <p>Quantity: {quantity}</p>
    </div>
  </div>
);

export default CartItems;






