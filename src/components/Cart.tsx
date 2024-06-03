import { useCart, useCartDispatch } from '../context/CartContext';
import CartItems from './CartItems';
import './Cart.css';

const Cart = () => {
  const { state } = useCart();
  const dispatch = useCartDispatch(); // Access the dispatch function from CartContext

  const decrementQuantity = (itemId: string) => {
    // Dispatch the DECREMENT_QUANTITY action
    dispatch({ type: 'DECREMENT_QUANTITY', payload: itemId });
  };

  const incrementQuantity = (itemId: string) => {
    // Dispatch the INCREMENT_QUANTITY action
    dispatch({ type: 'INCREMENT_QUANTITY', payload: itemId });
  };

  return (
    <div className="cart-product-container">
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items-container">
          {state.items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-items-prop">
                <CartItems
                  id={item.id} // Keep id as part of the props but do not render it in CartItems component
                  size={item.size}
                  productImage={item.productImage}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                />
                <div className="cart-item-actions">
                  <button onClick={() => decrementQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.id)}>+</button>
                  <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>Delete</button> {/* Dispatch REMOVE_ITEM action */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;



















