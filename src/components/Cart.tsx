import React from 'react';
import { useCart } from '../context/CartContext';
import CartItems from './CartItems';
import useCartActions from '../hooks/useCartActions';


const Cart = () => {
  const { state } = useCart();
  const { removeItemFromCart, clearCart } = useCartActions();

  // Calculate total price of items in the cart
  const totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-product-container">
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items-container">
          {state.items.map((item) => (
            <div key={item.id}>
              <CartItems
                id={item.id}
                name={item.name}
                price={item.price}
                productImage={item.productImage} 
                quantity={item.quantity}
              />
              <button className='deleteCart' onClick={() => removeItemFromCart(item.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
      <button className='clearCart' onClick={() => clearCart()}>Clear Cart</button>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default Cart;








