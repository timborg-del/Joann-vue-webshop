import { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';

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

// Create context
const CartContext = createContext<{
  state: CartState;
  dispatch: Dispatch<Action>;
  cartItemCount: number; // Add cartItemCount to the context value
}>({
  state: initialState,
  dispatch: () => null,
  cartItemCount: 0, // Initialize cartItemCount
});

// Provider component to wrap around the app
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Reducer function to handle state changes
  const cartReducer = (state: CartState, action: Action): CartState => {
    switch (action.type) {
      case 'ADD_ITEM':
        // Check if item already exists in cart
        const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
        if (existingIndex !== -1) {
          const updatedItems = [...state.items];
          updatedItems[existingIndex].quantity += action.payload.quantity;
          return { ...state, items: updatedItems };
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

  // Calculate cartItemCount based on the length of items array
  const cartItemCount = state.items.length;

  return (
    <CartContext.Provider value={{ state, dispatch, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to consume CartContext
export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartContext).dispatch;

export default CartContext;
