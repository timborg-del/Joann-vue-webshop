import { useCart, useCartDispatch } from '../context/CartContext';
import './Cart.css';
import { Product } from '../apiService';

interface CartItem extends Product {
  size: string;
  quantity: number;
}

export const Cart = () => {
  const { state } = useCart();
  const dispatch = useCartDispatch();

  const decrementQuantity = (itemId: string) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: itemId });
  };

  const incrementQuantity = (itemId: string) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: itemId });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const normalizeCartItems = (items: CartItem[]): CartItem[] => {
    return items.map(item => ({
      ...item,
      RowKey: item.RowKey,
      Name: item.Name,
      Price: item.Price ?? 0,
      AdditionalImages: item.AdditionalImages,
      quantity: item.quantity ?? 1,
      size: item.size ?? 'default-size'
    }));
  };

  console.log('Current cart items:', state.items);

  return (
    <div className="cart-product-container">
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items-container">
          {normalizeCartItems(state.items).map((item) => (
            <div key={`${item.RowKey}-${item.size}`} className="cart-item">
              <img src={item.AdditionalImages[0]} alt={item.Name} className="cart-item-image" />
              <div className="cart-item-details">
                <p>{item.Name}</p>
                <p>{item.size}</p>
                <p>{item.Price.toFixed(2)} SEK</p>
                <div className="cart-item-actions">
                  <button onClick={() => decrementQuantity(`${item.RowKey}-${item.size}`)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(`${item.RowKey}-${item.size}`)}>+</button>
                  <button onClick={() => removeItem(`${item.RowKey}-${item.size}`)}>Delete</button>
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

































