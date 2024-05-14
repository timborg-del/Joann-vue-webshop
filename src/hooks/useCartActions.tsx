import { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItems, { CartItemProps } from '../components/CartItems';
import useLocalStorage from './useLocalStorage'; // Import useLocalStorage hook

const useCartActions = () => {
  const { state, dispatch } = useCart();
  const [loading, setLoading] = useState(false);

  // Retrieve cart items from local storage or initialize as an empty array
  const [cartItems, setCartItems] = useLocalStorage<CartItemProps[]>('cartItems', []);

  const addItemToCart = (item: CartItemProps) => {
    setLoading(true);
    // Simulate asynchronous action (e.g., API call)
    setTimeout(() => {
      const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
      if (existingItemIndex !== -1) {
        // Item already exists in the cart, increment quantity by 1
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        setCartItems(updatedCartItems); // Update local storage
      } else {
        // Item is new to the cart, set quantity to 1
      
      }
      dispatch({ type: 'ADD_ITEM', payload: item });
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
    addItemToCart,
    removeItemFromCart,
    clearCart,
  };
};

export default useCartActions;







