import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import CartButton from './components/CartButton';
import { CartProvider } from './context/CartContext';
import ShopPage from './pages/ShopPage'; // Import the ShopPage component

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <div className='container'>
          {/* Navigation */}
          <nav className="navbar">
            <div className="dropdown">
              <h1 className='h1shop'><span>
                Shop
                <div className="dropdownContent">
                  <Link to="/shoppage">Mugs</Link> {/* Link to ShopPage */}
                  <Link to="/store">Paintings</Link>
                  <Link to="/store">Download</Link>
                  <Link to="/store">Pencils</Link>
                </div>
              </span></h1>
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
              {/* <Product id={'8'} name={'MyProduct'} price={200} quantity={11} productImage={''}></Product> */}
              {/* You can remove or comment out the Product component rendering */}
            </div>
          </main>

          {/* Routes */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shoppage" element={<ShopPage />} /> {/* Route for ShopPage */}
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;








