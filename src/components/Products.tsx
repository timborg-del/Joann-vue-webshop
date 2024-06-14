import React, { useState, useEffect } from 'react';
import useCartActions from '../hooks/useCartActions';
import './Products.css';
import useFetchData from '../hooks/useFetchData';
import { Product } from '../apiService';

const Products: React.FC = () => {
  const { addItemToCart } = useCartActions();
  const { data, isLoading, error } = useFetchData<Product[]>('https://joart.azurewebsites.net/GetProducts');

  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const priceAdjustments: { [key: string]: number } = {
    A3: 0,
    A4: -2,
    A5: -5
  };

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes({ ...selectedSizes, [productId]: size });
  };

  const getPrice = (productId: string, basePrice: number) => {
    const size = selectedSizes[productId] || 'A3';
    const adjustment = priceAdjustments[size] || 0;
    return basePrice + adjustment;
  };

  const handleAddToCart = (product: Product) => {
    const size = selectedSizes[product.RowKey] || 'A3';
    const uniqueId = `${product.RowKey}-${size}`;
    addItemToCart({
      ...product,
      RowKey: uniqueId,
      Price: getPrice(product.RowKey, product.Price),
      quantity: 1,
      size: size
    });
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
    console.error("Error fetching products:", error);
    return <div>Error: {error.message}</div>;
  }

  if (!Array.isArray(data)) {
    console.error("Unexpected data format:", data);
    return <div>Error: Unexpected data format</div>;
  }

  return (
    <div className="products-container">
      {data.length > 0 ? (
        data.map((product) => (
          <div 
            key={product.RowKey} 
            className={`product-wrapper ${activeProduct === product.RowKey ? 'active' : ''}`}
          >
            <div className={`product-card ${activeProduct === product.RowKey ? 'active' : ''}`}>
              {activeProduct === product.RowKey ? (
                <>
                  <button className="close-button" onClick={() => setActiveProduct(null)}>&times;</button>
                  <img 
                    src={product.ImageUrl}
                    alt={product.Name}
                    className="product-image"
                    onError={(e) => {
                      e.currentTarget.src = '/path/to/placeholder-image.jpg';
                      console.error("Image load error", e);
                    }}
                    onClick={() => setEnlargedImage(product.ImageUrl)}
                  />
                </>
              ) : (
                <div className="product-thumbnail" onClick={() => setActiveProduct(product.RowKey)}>
                  {product.ImageUrl ? (
                    <img 
                      src={product.ImageUrl}
                      alt={product.Name}
                      className="product-image"
                      onError={(e) => {
                        e.currentTarget.src = '/path/to/placeholder-image.jpg';
                        console.error("Image load error", e);
                      }}
                    />
                  ) : (
                    <div className="no-image">No Image Available</div>
                  )}
                  <div className="product-name">{product.Name}</div>
                </div>
              )}
              {activeProduct === product.RowKey && (
                <div className="product-details-dropdown">
                  <div className="product-info">
                    <p><strong>Name:</strong> {product.Name}</p>
                    <p><strong>Price:</strong> ${getPrice(product.RowKey, product.Price).toFixed(2)}</p>
                    <p><strong>Category:</strong> {product.Category}</p>
                  </div>
                  <div className="select-container">
                    <label htmlFor={`size-${product.RowKey}`}>Size:</label>
                    <select 
                      id={`size-${product.RowKey}`} 
                      value={selectedSizes[product.RowKey] || 'A3'}
                      onChange={(e) => handleSizeChange(product.RowKey, e.target.value)}
                    >
                      <option value="A3">A3</option>
                      <option value="A4">A4</option>
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
              )}
            </div>
          </div>
        ))
      ) : (
        <div>No products available</div>
      )}

      {enlargedImage && (
        <div className="enlarged-image-overlay" onClick={() => setEnlargedImage(null)}>
          <img src={enlargedImage} alt="Enlarged" className="enlarged-image" />
        </div>
      )}
    </div>
  );
};

export default Products;


































