// CartPage.tsx
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

    const [isCartPageVisible, setIsCartPageVisible] = useState(true); // State to track cart page visibility
    const { clearCart, removeItemFromCart } = useCartActions(); // Include removeItemFromCart from useCartActions
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

    const toggleCartPageVisibility = () => {
        setIsCartPageVisible(!isCartPageVisible); // Toggle cart page visibility
    };

    return (
        <div className="container">
            <div className='cart-page'>
                <h1>My Cart</h1>
                {/* Render Cart and checkout form based on visibility state */}
                {isCartPageVisible && (
                    <div className="cart">
                        <Cart />
                    </div>
                )}
                
                {isCartPageVisible && (
                    <form className="form-container" onSubmit={handleSubmit}>
                        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                        <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />
                        <button className='checkout_btn' type="submit">Checkout</button>
                    </form>
                )}
                {/* Button to toggle visibility */}
                <Link to="/" className="cartexit_btn">X</Link>

                {/* Clear Cart Button */}
                <button className="cartclear_btn" onClick={clearCart}>Clear Cart</button>
                
                {/* Total Price */}
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default CartPage;








