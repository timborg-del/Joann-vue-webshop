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
import ContactMe from './pages/ContactMe'; // Make sure to import ContactMe

const App: React.FC = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <Router>
      <CurrencyProvider>
        <CartProvider>
          <nav className="navbar">
            <div className='centerLinks'>        
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>            
              <Link to="/contact" className="contact-link">Contact</Link>
              <div className="dropdown" onMouseEnter={() => setIsShopOpen(true)} onMouseLeave={() => setIsShopOpen(false)}>           
                <h1 className='h1shop'>Shop</h1>
                <div className={`dropdownContent ${isShopOpen ? 'open' : ''}`}>
                  <Link to="/shoppage">Art-Prints</Link>
                </div>
                <Link to="/admin"></Link>
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
};

export default App;
