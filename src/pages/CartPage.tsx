import React, { useState } from 'react';
import Cart from '../components/Cart';
import PaypalStuff from '../components/PaypalStuff';
import './CartPage.css';
import { useCart } from '../context/CartContext';

interface CartPageProps {
  isVisible: boolean;
  onClose: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ isVisible, onClose }) => {
    const { state } = useCart();
    const totalPrice = state.items.reduce((total, item) => total + item.Price * item.quantity, 0);

    return (
        <div className={`cart-page-container ${isVisible ? 'active' : ''}`}>
            <div className='cart-page'>
                <button className="close-button-cart" onClick={onClose}>&#x2192;</button>
                <div className='cart-content'>
                    <div className='cart-container'>
                        <Cart />
                    </div>
                    <div className='form-container'>
                        <p className='total-price'>Total Price: ${totalPrice.toFixed(2)}</p>
                        <PaypalStuff cart={state.items} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;






























