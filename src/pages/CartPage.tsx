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
    address: {
      recipientName: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      countryCode: 'SE', // Adjust if necessary
      phone: ''
    },
    consent: false
  });

  const { state } = useCart();
  const totalPrice = state.items.reduce((total, item) => total + item.Price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
        [name]: value
      }
    }));
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
                  name="recipientName"
                  placeholder="Recipient Name"
                  value={formData.address.recipientName}
                  onChange={handleAddressChange}
                  required
                />
                <input
                  type="text"
                  name="line1"
                  placeholder="Address Line 1"
                  value={formData.address.line1}
                  onChange={handleAddressChange}
                  required
                />
                <input
                  type="text"
                  name="line2"
                  placeholder="Address Line 2"
                  value={formData.address.line2}
                  onChange={handleAddressChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.address.state}
                  onChange={handleAddressChange}
                  required
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.address.postalCode}
                  onChange={handleAddressChange}
                  required
                />
                <input
                  type="text"
                  name="countryCode"
                  placeholder="Country Code"
                  value={formData.address.countryCode}
                  onChange={handleAddressChange}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.address.phone}
                  onChange={handleAddressChange}
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


































