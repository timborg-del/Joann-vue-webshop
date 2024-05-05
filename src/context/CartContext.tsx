import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';

// Define types for cart items and state
interface CartItem {
  id: string;
  name: string;
  price: number;
  productImage: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

// Define action types
type Action =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

// Initial state
const initialState: CartState = {
  items: [],
};

// Custom hook to consume CartContext
export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartContext).dispatch;

// Create context
const CartContext = createContext<{ state: CartState; dispatch: Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null,
});

// Provider component to wrap around the app
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Reducer function to handle state changes
  const cartReducer = (state: CartState, action: Action): CartState => {
    let existingIndex: number; // Declare existingIndex outside the switch statement
    switch (action.type) {
      case 'ADD_ITEM':
        console.log('State before adding item:', state);
        // Check if item already exists in cart
        existingIndex = state.items.findIndex(item => item.id === action.payload.id);
        if (existingIndex !== -1) {
          const updatedItems = [...state.items];
          updatedItems[existingIndex].quantity += action.payload.quantity;
          const newState = { ...state, items: updatedItems };
          console.log('State after adding item:', newState);
          return newState;
          
        }
        return { ...state, items: [...state.items, action.payload] };
      case 'REMOVE_ITEM':
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload),
        };
      case 'CLEAR_CART':
        return initialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
