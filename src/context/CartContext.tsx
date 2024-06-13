import { createContext, useReducer, useContext, ReactNode, Dispatch, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Define types for cart items and state
export interface CartItem {
  id: string;
  name: string;
  price: number;
  ImageUrl: string;
  quantity: number;
  size?: string;
}

interface CartState {
  items: CartItem[];
}

// Define action types
type Action =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'INCREMENT_QUANTITY'; payload: string }
  | { type: 'DECREMENT_QUANTITY'; payload: string };

// Initial state
const initialState: CartState = {
  items: [],
};

// Create context
const CartContext = createContext<{
  state: CartState;
  dispatch: Dispatch<Action>;
  cartItemCount: number;
}>({
  state: initialState,
  dispatch: () => null,
  cartItemCount: 0,
});

// Provider component to wrap around the app
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [storedState, setStoredState] = useLocalStorage<CartState>('cart', initialState);

  const cartReducer = (state: CartState, action: Action): CartState => {
    switch (action.type) {
      case 'ADD_ITEM': {
        const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
        if (existingItemIndex !== -1) {
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex].quantity += 1;
          return { ...state, items: updatedItems };
        }
        return { 
          ...state, 
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
      case 'REMOVE_ITEM': {
        const updatedItems = state.items.filter(item => item.id !== action.payload);
        return { ...state, items: updatedItems };
      }
      case 'CLEAR_CART': {
        return initialState;
      }
      case 'INCREMENT_QUANTITY': {
        const incrementedItems = state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, items: incrementedItems };
      }
      case 'DECREMENT_QUANTITY': {
        const decrementedItems = state.items.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0);
        return { ...state, items: decrementedItems };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(cartReducer, storedState);

  useEffect(() => {
    setStoredState(state);
  }, [state, setStoredState]);

  const cartItemCount = state.items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hooks to consume CartContext
export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartContext).dispatch;

export default CartContext;






