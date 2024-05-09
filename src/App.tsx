import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import CartButton from './components/CartButton';
import { CartProvider } from './context/CartContext';
import ShopPage from './pages/ShopPage'; // Import the ShopPage component
import About from './pages/About';

const App: React.FC = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);



  return (
    <Router>
      <CartProvider>
        {/* Navigation */}
        <nav className="navbar">
          {/* Shop dropdown */}
          <div className='centerLinks'>
          <div className="dropdown" onMouseEnter={() => setIsShopOpen(true)} onMouseLeave={() => setIsShopOpen(false)}>
            <h1 className='h1shop'>Shop</h1>
            <div className={`dropdownContent ${isShopOpen ? 'open' : ''}`}>
              <Link to="/shoppage">Mugs</Link>
              <Link to="/store">Paintings</Link>
              <Link to="/store">Download</Link>
              <Link to="/store">Pencils</Link>
            </div>
          </div>
          {/* Center links */}
          
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </div>
          {/* Cart button */}
          <div>
            <CartButton />
          </div>
        </nav>


          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shoppage" element={<ShopPage />} /> {/* Route for ShopPage */}
            <Route path="/about" element={<About/>}></Route>
          </Routes>
        
      </CartProvider>
    </Router>
  );
};

export default App;








