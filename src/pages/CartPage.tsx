import React, { useState } from 'react';
import Cart from '../components/Cart';
import './CartPage.css'; // Import CSS file for CartPage styles
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

    const [isFormVisible, setIsFormVisible] = useState(false); // Initially set to false
    const [isCartPageVisible] = useState(true); // State to track cart page visibility
// Include removeItemFromCart from useCartActions
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
        <div className='cart-page-container'>
            <div className='cart-page'>
                <div className='cart-container'>
                    <h1>Cart</h1>
                    {/* Render Cart and checkout form based on visibility state */}
                    {isCartPageVisible && (                 
                        <Cart />
                    )}
                </div>
                
                <div className='form-container'>
                
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

                    {/* Button to toggle form visibility */}
                    <div className='hide-btn'>
                        {!isFormVisible && (
                            <button onClick={toggleFormVisibility} className="hideform_btn">Go To Checkout</button>
                        )}
                    </div>
                    {/* Button to navigate back to homepage */}
                    <Link to="/" className="cartexit_btn">X</Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;











