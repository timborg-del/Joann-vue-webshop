import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CartButton from './components/CartButton';
import { CartProvider } from './context/CartContext';
import ShopPage from './pages/ShopPage';
import About from './pages/About';
import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import ChangePassword from './components/ChangePassword';
import PrivateRoute from './components/PrivateRoute';
import CartPage from './pages/CartPage';
import { CurrencyProvider } from './components/CurrencyDetector';
import ContactMe from './pages/ContactMe'; // Ensure you have this import

const App: React.FC = () => {
  const isShopOpen = false; // Set to true when you want to reopen the shop
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const toggleMenuVisibility = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isShopOpen) {
    // Display this message when the shop is closed
    return (
      <div className="closed-message-container">
        <h1>Our webshop is currently closed.</h1>
        <p>We hope to get it up soon!</p>
        <p>Thank you for visiting!</p>
      </div>
    );
  }

  /* Commented out code for the full application */
  /*
  return (
    <Router>
      <CurrencyProvider>
        <CartProvider>
          <nav className="navbar">
            <div className='centerLinks'>
              <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenuVisibility}>
                <span className="hamburger-bar"></span>
                <span className="hamburger-bar"></span>
                <span className="hamburger-bar"></span>
              </button>
              <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link to="/contact" className="contact-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                <div 
                  className="dropdown" 
                  onMouseEnter={() => setIsShopOpen(true)} 
                  onMouseLeave={() => setIsShopOpen(false)}
                >
                  <h1 className='h1shop'>Shop</h1>
                  <div className={`dropdownContent ${isShopOpen ? 'open' : ''}`}>
                    <Link to="/shoppage" onClick={() => setIsMenuOpen(false)}>Art-Prints</Link>
                  </div>
                  <Link to="/admin"></Link>
                </div>
              </div>
            </div>
            <div>
              <button className="cart-button" onClick={toggleCartVisibility}>
                <CartButton onClick={toggleCartVisibility} />
              </button>
            </div>
          </nav>

          <CartPage isVisible={isCartVisible} onClose={toggleCartVisibility} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shoppage" element={<ShopPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/change-password" element={<PrivateRoute component={ChangePassword} />} />
            <Route path="/admin" element={<PrivateRoute component={AdminPage} />} />
            <Route path="/contact" element={<ContactMe />} />
          </Routes>
        </CartProvider>
      </CurrencyProvider>
    </Router>
  );
  */
};

export default App;
