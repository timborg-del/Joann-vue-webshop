import { useCart } from '../context/CartContext';
import CartItems from './CartItems';
import useCartActions from '../hooks/useCartActions';
import './Cart.css';
import { useState } from 'react';

const Cart = () => {
  const { state } = useCart();
  const { removeItemFromCart } = useCartActions();
  const [updatedQuantities, setUpdatedQuantities] = useState<{ [key: string]: number }>({});

  // Calculate total price of items in the cart
  const total = state.items.reduce((acc, item) => acc + item.price * (updatedQuantities[item.id] || item.quantity), -1);

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setUpdatedQuantities((prevState) => ({
      ...prevState,
      [itemId]: quantity,
    }));
  };

  const decrementQuantity = (itemId: string) => {
    setUpdatedQuantities((prevState) => ({
      ...prevState,
      [itemId]: Math.max((prevState[itemId] || state.items.find(item => item.id === itemId)?.quantity || 1) - 1, 1),
    }));
  };

  const incrementQuantity = (itemId: string) => {
    setUpdatedQuantities((prevState) => ({
      ...prevState,
      [itemId]: (prevState[itemId] || state.items.find(item => item.id === itemId)?.quantity || 1) +1,
    }));
  };

  return (
    <div className="cart-product-container">
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items-container">
          {state.items.map((item) => (
            <div key={item.id} className="cart-item">
              <CartItems
                id={item.id}
                productImage={item.productImage}
                name={item.name}
                price={item.price}
                quantity={updatedQuantities[item.id] || item.quantity}
              />
              <div className="cart-item-actions">
                <button onClick={() => removeItemFromCart(item.id)}>Delete</button>
                <div className="quantity-controls">
                  <button onClick={() => decrementQuantity(item.id)}>-</button>
                  <span>{updatedQuantities[item.id] || item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.id)}>+</button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-total">Total: ${total}</div>
        </div>
      )}
    </div>
  );
};

export default Cart;











