import React from 'react';
import productImage from '../assets/joann.jpg'; // Adjust the path as per your project structure

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  productImage: string; // Assuming productImage is a URL
  quantity: number;
}

const CartItems = ({ id, name, price, productImage, quantity }: CartItemProps) => (
  <div>
    <p>Key: {id}</p>
    <p>Name: {name}</p>
    <p>Price: ${price}</p>
    <img src={productImage} alt={name} /> {/* Render the image */}
    <p>Quantity: {quantity}</p>
  </div>
);

export default CartItems;



