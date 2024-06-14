import React, { useState } from 'react';
import Cart from '../components/Cart';
import PaypalStuff from '../components/PaypalStuff';
import './CartPage.css';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
    });

    const [isFormVisible, setIsFormVisible] = useState(false);
    const { state } = useCart();

    const totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsFormVisible(false); // Hide form after submit
        console.log(formData);
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <div className='cart-page-container'>
            <div className='cart-page'>
                <div className='cart-container'>
                    <h1>Cart</h1>
                    <Cart />
                </div>
                
                <div className={`form-container ${isFormVisible ? 'active' : ''}`}>
                    {isFormVisible && (
                        <form onSubmit={handleSubmit}>
                            <div className='input-text'>
                                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                                <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />
                            </div>
                            <p className='total-price'>Total Price: ${totalPrice.toFixed(2)}</p>
                            <button type="submit" className='checkout_btn'>Checkout</button>
                        </form>
                    )}
                </div>

                <div className='hide-btn'>
                    {!isFormVisible && (
                        <button onClick={toggleFormVisibility} className="hideform_btn">Go To Checkout</button>
                    )}
                </div>

                {isFormVisible && (
                    <PaypalStuff cart={state.items} formData={formData} />
                )}

                <Link to="/" className="cartexit_btn">X</Link>
            </div>
        </div>
    );
};

export default CartPage;













