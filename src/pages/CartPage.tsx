import React, { useState } from 'react';
import Cart from '../components/Cart';

const CartPage: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle checkout logic here, such as sending data to the server
        console.log(formData);
    };

    return (
      <div className='container-my-cart'>
        <div className="cart-page">
            <h1>My Cart</h1>
            <div className="cart">
                <Cart />
            </div>
            <h2>Checkout</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />
                <button type="submit">Checkout</button>
            </form>
        </div>
        </div>
    );
};

export default CartPage;



