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
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
    });
    const { state } = useCart();

    const totalPrice = state.items.reduce((total, item) => total + item.Price * item.quantity, 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className={`cart-page-container ${isVisible ? 'active' : ''}`}>
            <div className='cart-page'>
                <button className="close-button-cart" onClick={onClose}>&#x2192;</button>
                <div className='cart-content'>
                    <div className='cart-container'>
                        <Cart />
                    </div>
                    <div className='form-container'>
                        <form onSubmit={handleSubmit}>
                            <div className='input-text'>
                                <input 
                                    type="text" 
                                    name="fullName" 
                                    placeholder="Full Name" 
                                    value={formData.fullName} 
                                    onChange={handleChange} 
                                    required 
                                />
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                />
                                <input 
                                    type="text" 
                                    name="address" 
                                    placeholder="Address" 
                                    value={formData.address} 
                                    onChange={handleChange} 
                                    required 
                                />
                                <input 
                                    type="text" 
                                    name="city" 
                                    placeholder="City" 
                                    value={formData.city} 
                                    onChange={handleChange} 
                                    required 
                                />
                                <input 
                                    type="text" 
                                    name="postalCode" 
                                    placeholder="Postal Code" 
                                    value={formData.postalCode} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <p className='total-price'>Total Price: ${totalPrice.toFixed(2)}</p>
                            <PaypalStuff cart={state.items} formData={formData} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;


































