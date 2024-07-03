import React, { useState, useEffect } from 'react';
import useCartActions from '../hooks/useCartActions';
import './Products.css';
import useFetchData from '../hooks/useFetchData';
import { Product } from '../apiService';
import { useCart, useCartDispatch } from '../context/CartContext';

interface ProductsProps {
  activeProductName: string | null;
}

const Products: React.FC<ProductsProps> = ({ activeProductName }) => {
  const { addItemToCart } = useCartActions();
  const { data: products, isLoading, error } = useFetchData<Product[]>('https://joart.azurewebsites.net/GetProducts');
  const [activeProduct, setActiveProduct] = useState<string | null>(activeProductName);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const { state } = useCart();
  const dispatch = useCartDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const priceAdjustments: { [key: string]: number } = {
    A3: 0,
    A4: -2,
    A5: -5
  };

  useEffect(() => {
    if (activeProductName) {
      const product = products?.find((p) => p.Name === activeProductName);
      if (product) {
        setActiveProduct(product.RowKey);
      }
    }

    // Trigger the transition effect after the component mounts
    setIsVisible(true);
  }, [activeProductName, products]);

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes({ ...selectedSizes, [productId]: size });
  };

  const getPrice = (basePrice: number, size: string) => {
    const adjustment = priceAdjustments[size] || 0;
    const priceInSek = basePrice + adjustment;
    return priceInSek.toFixed(2);
  };

  const handleAddToCart = (product: Product) => {
    const size = selectedSizes[product.RowKey] || 'A3';
    const uniqueId = `${product.RowKey}-${size}`;
    addItemToCart({
      ...product,
      RowKey: uniqueId,
      Price: product.Price, // Keep the price in SEK
      quantity: 1,
      size: size
    });
  };

  const incrementQuantity = (product: Product) => {
    const size = selectedSizes[product.RowKey] || 'A3';
    const uniqueId = `${product.RowKey}-${size}`;
    const cartItem = state.items.find(item => item.RowKey === uniqueId);
    if (cartItem) {
      dispatch({ type: 'INCREMENT_QUANTITY', payload: uniqueId });
    }
  };

  const decrementQuantity = (product: Product) => {
    const size = selectedSizes[product.RowKey] || 'A3';
    const uniqueId = `${product.RowKey}-${size}`;
    const cartItem = state.items.find(item => item.RowKey === uniqueId);
    if (cartItem) {
      if (cartItem.quantity > 1) {
        dispatch({ type: 'DECREMENT_QUANTITY', payload: uniqueId });
      } else {
        dispatch({ type: 'REMOVE_ITEM', payload: uniqueId });
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching products:", error);
    return <div>Error: {error.message}</div>;
  }

  if (!Array.isArray(products)) {
    console.error("Unexpected data format:", products);
    return <div>Error: Unexpected data format</div>;
  }

  return (
    <div className={`products-container ${isVisible ? 'visible' : ''}`}>
      {products.length > 0 ? (
        products.map((product) => {
          const uniqueId = `${product.RowKey}-${selectedSizes[product.RowKey] || 'A3'}`;
          const cartItem = state.items.find(item => item.RowKey === uniqueId);
          const quantity = cartItem ? cartItem.quantity : 0;
          const size = selectedSizes[product.RowKey] || 'A3';

          return (
            <div
              key={product.RowKey}
              className={`product-wrapper ${activeProduct === product.RowKey ? 'active' : ''}`}
            >
              <div className={`product-card ${activeProduct === product.RowKey ? 'active' : ''}`}>
                {activeProduct === product.RowKey ? (
                  <>
                    <button className="close-button-details" onClick={() => setActiveProduct(null)}>&times;</button>
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
                      <p><strong>Price:</strong> {getPrice(product.Price, size)} SEK</p>
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
                    <div className="controls-container">
                      {quantity > 0 && (
                        <div className="quantity-controls">
                          <button onClick={() => decrementQuantity(product)}>-</button>
                          <span>{quantity}</span>
                          <button onClick={() => incrementQuantity(product)}>+</button>
                        </div>
                      )}
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
          );
        })
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













































































