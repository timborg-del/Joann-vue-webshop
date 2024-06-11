import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import CartButton from './components/CartButton';
import { CartProvider } from './context/CartContext';
import ShopPage from './pages/ShopPage';
import About from './pages/About';
import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import ChangePassword from './components/ChangePassword';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);

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
            <CartButton />
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
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











