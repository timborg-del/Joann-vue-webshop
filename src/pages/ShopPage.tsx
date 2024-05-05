import React from 'react';
import Product from '../components/Products'; // Import the Product component
import joannImage from '../assets/joann.jpg'; // Import the productImage

const ShopPage: React.FC = () => {
  return (
    
    <main className="main-content">
        <div>
        <h2 className='h2shop'>Product Page</h2>
        </div>
    
      <div>
        
        <Product id={''} name={''} price={0} productImage={''} quantity={0}></Product>
      </div>
    
    </main>
  );
};

export default ShopPage;

