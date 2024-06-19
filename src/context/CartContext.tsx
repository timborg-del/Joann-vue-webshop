import { createContext, useReducer, useContext, ReactNode, Dispatch, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Product } from '../apiService';

interface CartState {
  items: Product[];
}

type Action =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'INCREMENT_QUANTITY'; payload: string }
  | { type: 'DECREMENT_QUANTITY'; payload: string };

const initialState: CartState = {
  items: [],
};

const CartContext = createContext<{
  state: CartState;
  dispatch: Dispatch<Action>;
  cartItemCount: number;
}>({
  state: initialState,
  dispatch: () => null,
  cartItemCount: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [storedState, setStoredState] = useLocalStorage<CartState>('cart', initialState);

  const cartReducer = (state: CartState, action: Action): CartState => {
    console.log('Action dispatched:', action);
    switch (action.type) {
      case 'ADD_ITEM': {
        const existingItemIndex = state.items.findIndex(item => item.RowKey === action.payload.RowKey && item.size === action.payload.size);
        if (existingItemIndex !== -1) {
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex].quantity += action.payload.quantity;
          console.log('Updated items after ADD_ITEM:', updatedItems);
          return { ...state, items: updatedItems };
        }
        console.log('Items after ADD_ITEM:', [...state.items, action.payload]);
        return { 
          ...state, 
          items: [...state.items, action.payload]
        };
      }
      case 'REMOVE_ITEM': {
        const updatedItems = state.items.filter(item => item.RowKey !== action.payload);
        console.log('Updated items after REMOVE_ITEM:', updatedItems);
        return { ...state, items: updatedItems };
      }
      case 'CLEAR_CART': {
        console.log('Cart cleared');
        return initialState;
      }
      case 'INCREMENT_QUANTITY': {
        const incrementedItems = state.items.map(item =>
          item.RowKey === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log('Items after INCREMENT_QUANTITY:', incrementedItems);
        return { ...state, items: incrementedItems };
      }
      case 'DECREMENT_QUANTITY': {
        const decrementedItems = state.items.map(item =>
          item.RowKey === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0);
        console.log('Items after DECREMENT_QUANTITY:', decrementedItems);
        return { ...state, items: decrementedItems };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(cartReducer, storedState || initialState);

  useEffect(() => {
    console.log('State updated:', state);
    setStoredState(state);
  }, [state, setStoredState]);

  const cartItemCount = state.items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartContext).dispatch;

export default CartContext;

















