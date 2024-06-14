import { useCart, useCartDispatch } from '../context/CartContext';
import './Cart.css';


const Cart = () => {
  const { state } = useCart();
  const dispatch = useCartDispatch();

  const decrementQuantity = (itemId: string) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: itemId });
  };

  const incrementQuantity = (itemId: string) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: itemId });
  };

  return (
    <div className="cart-product-container">
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items-container">
          {state.items.map((item) => (
            <div key={item.RowKey} className="cart-item">
              <div className="cart-items-prop">
                <div className="cart-item-details">
                  <img src={item.ImageUrl} alt={item.Name} />
                  <div>
                    <p>{item.Name}</p>
                    <p>{item.size}</p>
                    <p>${item.Price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => decrementQuantity(item.RowKey)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.RowKey)}>+</button>
                  <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.RowKey })}>Delete</button>
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
























