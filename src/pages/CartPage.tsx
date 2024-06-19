import React, { useState } from 'react';
import Cart from '../components/Cart';
import PaypalStuff from '../components/PaypalStuff';
import './CartPage.css';
import { useCart, useSetFormData } from '../context/CartContext';

interface CartPageProps {
  isVisible: boolean;
  onClose: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ isVisible, onClose }) => {
    const { state } = useCart();
    const setFormData = useSetFormData();

    const [localFormData, setLocalFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
    });

    const totalPrice = state.items.reduce((total, item) => total + item.Price * item.quantity, 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedFormData = { ...localFormData, [name]: value };
        setLocalFormData(updatedFormData);
        setFormData(updatedFormData); // Update form data in context
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(localFormData);
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
                                    value={localFormData.fullName} 
                                    onChange={handleChange} 
                                    required 
                                />
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Email" 
                                    value={localFormData.email} 
                                    onChange={handleChange} 
                                    required 
                                />
                                <input 
                                    type="text" 
                                    name="address" 
                                    placeholder="Address" 
                                    value={localFormData.address} 
                                    onChange={handleChange} 
                                    required 
                                />
                                <input 
                                    type="text" 
                                    name="city" 
                                    placeholder="City" 
                                    value={localFormData.city} 
                                    onChange={handleChange} 
                                    required 
                                />
                                <input 
                                    type="text" 
                                    name="postalCode" 
                                    placeholder="Postal Code" 
                                    value={localFormData.postalCode} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <p className='total-price'>Total Price: ${totalPrice.toFixed(2)}</p>
                            <PaypalStuff cart={state.items} formData={state.formData} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;































