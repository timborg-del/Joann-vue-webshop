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
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  
  // Define price adjustments as a constant
  const priceAdjustments: { [key: string]: number } = {
    A3: 0, // No adjustment for A3
    A5: -2 // Adjust price by -2 for A5
  };

  const toggleDetails = (productId: string) => {
    setActiveProduct(activeProduct === productId ? null : productId);
  };

  useEffect(() => {
    if (data) {
      console.log("Fetched data:", data);
    }
  }, [data]);

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes({ ...selectedSizes, [productId]: size });
  };

  const getPrice = (productId: string, basePrice: number) => {
    const size = selectedSizes[productId] || 'A3';
    const adjustment = priceAdjustments[size as keyof typeof priceAdjustments] || 0;
    return basePrice + adjustment;
  };

  const handleAddToCart = (product: CartItemProps & Product) => {
    const size = selectedSizes[product.RowKey] || 'A3';
    const uniqueId = `${product.RowKey}-${size}`;
    addItemToCart({
      id: uniqueId,
      name: product.Name,
      price: getPrice(product.RowKey, product.Price),
      productImage: product.ProductImageBase64,
      quantity: 1,
      size: size
    });
  };

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
                <p>${getPrice(product.RowKey, product.Price).toFixed(2)}</p>
              </div>
              <div className="product-details-dropdown">
                <p>{product.Name}</p>
                <p>Price: ${getPrice(product.RowKey, product.Price).toFixed(2)}</p>
                <p>Stock: {product.Stock}</p>
                <p>Category: {product.Category}</p>
                <div>
                  <label htmlFor={`size-${product.RowKey}`}>Size:</label>
                  <select 
                    id={`size-${product.RowKey}`} 
                    value={selectedSizes[product.RowKey] || 'A3'}
                    onChange={(e) => handleSizeChange(product.RowKey, e.target.value)}
                  >
                    <option value="A3">A3</option>
                    <option value="A5">A5</option>
                  </select>
                </div>
                <div className="buy-btn-container">
                  <button 
                    className="buy-btn" 
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
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

































