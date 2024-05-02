import React from 'react';
import { CartItemProps } from './CartItems';

const ItemList: React.FC = () => {
  // Dummy data for demonstration
  const items: CartItemProps[] = [
    { id: '1', name: 'Product 1', price: 10, quantity: 1 },
    { id: '2', name: 'Product 2', price: 15, quantity: 1 },
    { id: '3', name: 'Product 3', price: 20, quantity: 1 },
  ];

  return (
    <div>
      <h2>Items Available</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div>
              <p>Name: {item.name}</p>
              <p>Price: ${item.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;



