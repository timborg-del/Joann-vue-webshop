import React, { useState, useEffect } from 'react';
import { CartItemProps } from './CartItems';
import useCartActions from '../hooks/useCartActions'; // Import useCartActions hook
import './Products.css'; // Import the corresponding CSS file
import useFetchData from '../hooks/useFetchData'; // Import the useFetchData hook
import { Product } from '../apiService'; // Adjust import as needed

const Products: React.FC = () => {
  const { addItemToCart } = useCartActions(); // Access addItemToCart function from useCartActions hook
  const { data, isLoading, error } = useFetchData('https://joart.azurewebsites.net/GetProducts'); // Fetch products data

  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  const toggleDetails = (productId: string) => {
    setActiveProduct(activeProduct === productId ? null : productId);
  };

  useEffect(() => {
    if (data) {
      console.log("Fetched data:", data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching products:", error); // Log detailed error
    return <div>Error: {error.message}</div>;
  }

  // Check if data is an array
  if (!Array.isArray(data)) {
    console.error("Unexpected data format:", data); // Log unexpected data format
    return <div>Error: Unexpected data format</div>;
  }

  const productsArray: (CartItemProps & Product)[] = data;

  return (
    <div className='container'>
      <div className="products-container">
        {productsArray.length > 0 ? (
          productsArray.map((product) => (
            <div 
              key={product.RowKey} 
              className={`product-card ${activeProduct === product.RowKey ? 'active' : ''}`}
            >
              {product.ProductImageBase64 ? (
                <img 
                  src={product.ProductImageBase64} 
                  alt={product.Name} 
                  className="product-image" 
                  onError={(e) => console.error("Image load error", e)}
                  onClick={() => toggleDetails(product.RowKey)}
                />
              ) : (
                <div className="no-image">No Image Available</div>
              )}
              <div className="product-details">
                <p>{product.Name}</p>
                <p>${product.Price.toFixed(2)}</p>
              </div>
              <div className="product-details-dropdown">
                <p>{product.Name}</p>
                <p>Price: ${product.Price.toFixed(2)}</p>
                <p>Stock: {product.Stock}</p>
                <p>Category: {product.Category}</p>
                <div>
                  <label htmlFor={`size-${product.RowKey}`}>Size:</label>
                  <select id={`size-${product.RowKey}`}>
                    <option value="A3">A3</option>
                    <option value="A5">A5</option>
                  </select>
                </div>
                <button 
                  className="buy-btn" 
                  onClick={() => addItemToCart({
                    id: product.RowKey,
                    name: product.Name,
                    price: product.Price,
                    productImage: product.ProductImageBase64,
                    quantity: 1
                  })}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
};

export default Products;


















