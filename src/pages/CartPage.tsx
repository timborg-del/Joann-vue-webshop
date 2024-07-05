import React, { useState, useContext } from 'react';
import Cart from '../components/Cart';
import PaypalStuff from '../components/PaypalStuff';
import './CartPage.css';
import { useCart } from '../context/CartContext';
import { CurrencyContext } from '../components/CurrencyDetector';

interface CartPageProps {
  isVisible: boolean;
  onClose: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ isVisible, onClose }) => {
  const { state } = useCart();
  const { currency } = useContext(CurrencyContext); // Use the currency from context
  const totalPrice = state.items.reduce((total, item) => total + item.Price * item.quantity, 0);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsLeaving(false);
      onClose();
    }, 500); // Match the transition duration
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      'USD': '$',
      'GBP': '£',
      'EUR': '€',
      'SEK': 'kr',
      // Add more symbols as needed
    };
    return symbols[currency] || '';
  };

  const currencySymbol = getCurrencySymbol(currency);

  return (
    <div className={`cart-page-container ${isVisible ? 'active' : ''} ${isLeaving ? 'leaving' : ''}`}>
      <div className='cart-page'>
        <button className="close-button-cart" onClick={handleClose}>&#x2192;</button>
        <div className='cart-content'>
          <div className='cart-container'>
            <Cart />
          </div>
          <div className='form-container'>
            <p className='total-price'>Total Price: {currencySymbol}{totalPrice.toFixed(2)}</p>
            <PaypalStuff cart={state.items} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;




































