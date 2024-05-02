import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route from react-router-dom
import './App.css';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import CartButton from './components/CartButton';
import { CartProvider } from '../src/context/CartContext'; // Import CartProvider from CartContext
import Product from './components/Products';

const App: React.FC = () => {
  return (
    <body>
    <Router>
      <CartProvider> {/* Wrap your entire application with CartProvider */}
        <div>
          {/* Navigation */}
          <nav>
            <ul>
              <li>
                <CartButton /> {/* Assuming CartButton is a component for cart navigation */}
              </li>
            </ul>
          </nav>
            <main>
              <div>
                <Product id={'8'} name={'MyProduct'} price={200} quantity={11}></Product>

              </div>
            </main>
         

          {/* Main content */}
          <Routes> {/* Wrap your routes inside <Routes> */}
            <Route path="/home" element={<Home />} /> {/* Use element prop to specify the component */}
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
    </body>
  );
};

export default App;


