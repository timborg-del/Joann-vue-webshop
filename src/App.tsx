import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import CartButton from './components/CartButton';
import { CartProvider } from './context/CartContext'; // Corrected import path
import Product from './components/Products';

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <div className='container'>
          {/* Navigation */}
          <nav className="navbar">
            <div className="dropdown">
              <span className="dropbtn">
                Shop
                <div className="dropdownContent">
                  <Link to="./store">Mugs</Link>
                  <Link to="./store">Paintings</Link>
                  <Link to="./store">Download</Link>
                  <Link to="./store">Pencils</Link>
                </div>
              </span>
            </div>
            <div className='centerLinks'>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/cart">Cart</Link>
            </div>
            <div className="cart-button">
              <CartButton />
            </div>
          </nav>

          {/* Main content */}
          <main className="main-content">
            <div className="card">
              {/* Render your products or other components here */}
              <Product id={'8'} name={'MyProduct'} price={200} quantity={11}></Product>
            </div>
          </main>

          {/* Routes */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;







