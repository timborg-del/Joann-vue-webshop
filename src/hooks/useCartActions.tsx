import { useState } from 'react';
import { useCart, useCartDispatch } from '../context/CartContext';
import { Product, FormData } from '../apiService'; // Ensure this path is correct

const useCartActions = () => {
  const dispatch = useCartDispatch();
  const { state } = useCart();
  const [loading, setLoading] = useState(false);

  const addItemToCart = (item: Product) => {
    setLoading(true);
    const existingItem = state.items.find(cartItem => cartItem.RowKey === item.RowKey && cartItem.size === item.size);
    
    if (existingItem) {
      dispatch({ type: 'INCREMENT_QUANTITY', payload: item.RowKey });
    } else {
      dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: 1, Price: item.Price ?? 0 } });
    }

    setLoading(false);
  };

  const removeItemFromCart = (itemId: string) => {
    setLoading(true);
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
    setLoading(false);
  };

  const clearCart = () => {
    setLoading(true);
    dispatch({ type: 'CLEAR_CART' });
    setLoading(false);
  };

  const setFormData = (formData: FormData) => {
    dispatch({ type: 'SET_FORM_DATA', payload: formData });
  };

  return {
    cart: state,
    loading,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    setFormData,
  };
};

export default useCartActions;
















