import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CartItemProps } from '../components/CartItems';
import useLocalStorage from './useLocalStorage'; // Import useLocalStorage hook

const useCartActions = () => {
  const { state, dispatch } = useCart();
  const [loading, setLoading] = useState(false);

  // Retrieve cart items from local storage or initialize as an empty array
  const [cartItems, setCartItems] = useLocalStorage<CartItemProps[]>('cartItems', []);

  // Calculate cartItemCount based on the length of items array in the cart state
  const cartItemCount = state.items.length;

  const addItemToCart = (item: CartItemProps) => {
    setLoading(true);
    // Simulate asynchronous action (e.g., API call)
    setTimeout(() => {
      dispatch({ type: 'ADD_ITEM', payload: item });
      const updatedCartItems = [...cartItems, item];
      setCartItems(updatedCartItems); // Update local storage
      setLoading(false);
    }, 1000);
  };

  const removeItemFromCart = (itemId: string) => {
    setLoading(true);
    // Simulate asynchronous action (e.g., API call)
    setTimeout(() => {
      dispatch({ type: 'REMOVE_ITEM', payload: itemId });
      const updatedItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedItems); // Update local storage
      setLoading(false);
    }, 1000);
  };

  const clearCart = () => {
    setLoading(true);
    // Simulate asynchronous action (e.g., API call)
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      setCartItems([]); // Clear local storage
      setLoading(false);
    }, 1000);
  };

  return {
    cart: state,
    loading,
    cartItemCount, // Include cartItemCount in the returned object
    addItemToCart,
    removeItemFromCart,
    clearCart,
  };
};

export default useCartActions;





