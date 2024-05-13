import React, { useState } from 'react';
import Cart from '../components/Cart';
import './CartPage.css'; // Import CSS file for CartPage styles
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useCartActions from '../hooks/useCartActions';

const CartPage: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
    });

    const [isFormVisible, setIsFormVisible] = useState(true); // State to track form visibility
    const [isCartPageVisible, ] = useState(true); // State to track cart page visibility
    const { clearCart, } = useCartActions(); // Include removeItemFromCart from useCartActions
    const { state } = useCart();

    // Calculate total price of items in the cart
    const totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle checkout logic here, such as sending data to the server
        console.log(formData);
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible); // Toggle form visibility
    };

    

    return (
        
            <div className='cart-page'>
                <h1>My Cart</h1>
                {/* Render Cart and checkout form based on visibility state */}
                {isCartPageVisible && (                 
                        <Cart />
                )}
                
                {isFormVisible && (
                    <form className="form-container" onSubmit={handleSubmit}>
                        <div className='input-text'>
                        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                        <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />
                        </div>
                        <p>Total Price: ${totalPrice.toFixed(2)}</p>
                        <button className='checkout_btn' type="submit">Checkout</button>
                        
                        
                        <button className="cartclear_btn" onClick={clearCart}>Clear Cart</button>
                    </form>
                    
                )}

                {/* Button to toggle form visibility */}
                <div className='hide-btn'>
                <button className="hideform_btn" onClick={toggleFormVisibility}>{isFormVisible ? 'Hide Checkout' : 'Go To Checkout'}</button>
                </div>

                {/* Button to toggle visibility */}
                <Link to="/" className="cartexit_btn">X</Link>

                {/* Clear Cart Button */}
                
                
                {/* Total Price */}
                
            </div>
        
    );
};

export default CartPage;









