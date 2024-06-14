import { useState } from 'react';
import { useCart, useCartDispatch } from '../context/CartContext'; // Import useCartDispatch instead of useCart
import { CartProduct } from '../context/CartContext'; // Ensure this path is correct

const useCartActions = () => {
  const dispatch = useCartDispatch(); // Use useCartDispatch to get the dispatch function
  const { state } = useCart(); // Get the cart state directly from useCart
  const [loading, setLoading] = useState(false);

  const addItemToCart = (item: CartProduct) => {
    setLoading(true);
    // Simulate asynchronous action (e.g., API call)
    setTimeout(() => {
      const existingItem = state.items.find(cartItem => cartItem.RowKey === item.RowKey && cartItem.size === item.size);
      
      if (existingItem) {
        // Item already exists in the cart, increment quantity by 1
        dispatch({ type: 'INCREMENT_QUANTITY', payload: item.RowKey });
      } else {
        // Item is new to the cart, add it with quantity 1
        dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: 1 } });
      }

      setLoading(false);
    }, 1000);
  };

  const removeItemFromCart = (itemId: string) => {
    setLoading(true);
    // Simulate asynchronous action (e.g., API call)
    setTimeout(() => {
      dispatch({ type: 'REMOVE_ITEM', payload: itemId });
      setLoading(false);
    }, 1000);
  };

  const clearCart = () => {
    setLoading(true);
    // Simulate asynchronous action (e.g., API call)
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      setLoading(false);
    }, 1000);
  };

  return {
    cart: state,
    loading,
    addItemToCart,
    removeItemFromCart,
    clearCart,
  };
};

export default useCartActions;














