import { useCart, useCartDispatch } from '../context/CartContext';
import './Cart.css';
import { Product } from '../apiService'; // Ensure this path is correct

const Cart = () => {
  const { state } = useCart();
  const dispatch = useCartDispatch();

  const decrementQuantity = (itemId: string) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: itemId });
  };

  const incrementQuantity = (itemId: string) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: itemId });
  };

  // Normalize data structure to ensure consistency
  const normalizeCartItems = (items: Product[]): Product[] => {
    return items.map(item => ({
      ...item,
      RowKey: item.RowKey,
      Name: item.Name,
      Price: item.Price ?? 0,
      ImageUrl: item.ImageUrl,
      quantity: item.quantity ?? 1,
      size: item.size ?? 'default-size'
    }));
  };

  return (
    <div className="cart-product-container">
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items-container">
          {normalizeCartItems(state.items).map((item) => (
            <div key={item.RowKey} className="cart-item">
              <img src={item.ImageUrl} alt={item.Name} className="cart-item-image" />
              <div className="cart-item-details">
                <p>{item.Name}</p>
                <p>{item.size}</p>
                <p>${item.Price.toFixed(2)}</p>
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




























