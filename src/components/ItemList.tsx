import React from 'react';
import { CartItemProps } from './CartItems';

const ItemList: React.FC = () => {
  const items: CartItemProps[] = [
    { id: '1', name: 'Product 1', price: 10, quantity: 1, ImageUrl: '/src/assets/product1.jpg' },
    { id: '2', name: 'Product 2', price: 15, quantity: 1, ImageUrl: '/src/assets/product2.jpg' },
    { id: '3', name: 'Product 3', price: 20, quantity: 1, ImageUrl: '/src/assets/product3.jpg' },
  ];

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <img src={item.ImageUrl} alt={item.name} />
          <p>{item.name}</p>
          <p>{item.price}</p>
          <p>{item.quantity}</p>
          <p>{item.size}</p>
        </div>
      ))}
    </div>
  );
};

export default ItemList;





