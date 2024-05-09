// Cart.tsx

import { useCart } from '../context/CartContext';
import CartItems from './CartItems';
import useCartActions from '../hooks/useCartActions';
import './Cart.css';

const Cart = () => {
  const { state } = useCart();
  const { removeItemFromCart, } = useCartActions();

  // Calculate total price of items in the cart


  return (
    
    <div className="cart-product-container">
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items-container">
          {state.items.map((item) => (
            <div key={item.id} className="cart-item">
              <CartItems
                id={item.id}
                productImage={item.productImage} 
                name={item.name}
                price={item.price}
                
                quantity={item.quantity}
              />
              <div className="cart-buttons">
                <button className='delete_btn' onClick={() => removeItemFromCart(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

      )}
    </div>
    
    
  );
};

export default Cart;









