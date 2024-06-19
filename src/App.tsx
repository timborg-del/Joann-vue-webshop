import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
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
import useLocalStorage from './hooks/useLocalStorage'; // Ensure this is the correct path

const App: React.FC = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [token, setToken] = useLocalStorage<string | null>('token', null);
  const navigate = useNavigate();

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleLogout = () => {
    setToken(null); // Clear the token from local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <Router>
      <CartProvider>
        <nav className="navbar">
          <div className='centerLinks'>
            <div className="dropdown" onMouseEnter={() => setIsShopOpen(true)} onMouseLeave={() => setIsShopOpen(false)}>
              <h1 className='h1shop'>Shop</h1>
              <div className={`dropdownContent ${isShopOpen ? 'open' : ''}`}>
                <Link to="/shoppage">Mugs</Link>
                <Link to="/shoppage">Paintings</Link>
                <Link to="/shoppage">Download</Link>
                <Link to="/shoppage">Pencils</Link>
              </div>
            </div>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/admin">Admin</Link>
          </div>
          <div>
            <button className="cart-button" onClick={toggleCartVisibility}>
              <CartButton />
            </button>
            {token && (
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            )}
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
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;










{/*  <Route path="/admin" element={<AdminPage />} /> */}











