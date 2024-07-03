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
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const { state } = useCart();
  const dispatch = useCartDispatch();

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
  }, [activeProductName, products]);

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

  const incrementQuantity = (product: Product) => {
    const size = selectedSizes[product.RowKey] || 'A3';
    const uniqueId = `${product.RowKey}-${size}`;
    const cartItem = state.items.find(item => item.RowKey === uniqueId);
    if (cartItem) {
      dispatch({ type: 'INCREMENT_QUANTITY', payload: uniqueId });
    } else {
      addItemToCart({
        ...product,
        RowKey: uniqueId,
        Price: getPrice(product.RowKey, product.Price),
        quantity: 1,
        size: size
      });
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

  const handleNextImage = (productId: string) => {
    const product = products?.find((p) => p.RowKey === productId);
    if (product && product.AdditionalImages.length > 0) {
      setCurrentImageIndex((prevState) => ({
        ...prevState,
        [productId]: (prevState[productId] + 1) % product.AdditionalImages.length,
      }));
    }
  };

  const handlePreviousImage = (productId: string) => {
    const product = products?.find((p) => p.RowKey === productId);
    if (product && product.AdditionalImages.length > 0) {
      setCurrentImageIndex((prevState) => ({
        ...prevState,
        [productId]: prevState[productId] === 0 ? product.AdditionalImages.length - 1 : prevState[productId] - 1,
      }));
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
    <div className="products-container">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.RowKey}
            className={`product-wrapper ${activeProduct === product.RowKey ? 'active' : ''}`}
          >
            <div className={`product-card ${activeProduct === product.RowKey ? 'active' : ''}`}>
              {activeProduct === product.RowKey ? (
                <>
                  <button className="close-button-details" onClick={() => setActiveProduct(null)}>&times;</button>
                  <div className="image-gallery-container">
                    <button className="gallery-nav-button" onClick={() => handlePreviousImage(product.RowKey)}>{"<"}</button>
                    <img
                      src={product.AdditionalImages[currentImageIndex[product.RowKey]] || '/path/to/placeholder-image.jpg'}
                      alt={product.Name}
                      className="product-image"
                      onError={(e) => {
                        e.currentTarget.src = '/path/to/placeholder-image.jpg';
                        console.error("Image load error", e);
                      }}
                      onClick={() => setEnlargedImage(product.AdditionalImages[currentImageIndex[product.RowKey]] || '/path/to/placeholder-image.jpg')}
                    />
                    <button className="gallery-nav-button" onClick={() => handleNextImage(product.RowKey)}>{">"}</button>
                  </div>
                </>
              ) : (
                <div className="product-thumbnail" onClick={() => setActiveProduct(product.RowKey)}>
                  {product.AdditionalImages.length > 0 ? (
                    <img
                      src={product.AdditionalImages[0]}
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
                    <p><strong>Price:</strong> {getPrice(product.RowKey, product.Price).toFixed(2)} SEK</p>
                    <p><strong>Category:</strong> {product.Category}</p>
                    <div className="quantity-controls">
                      <button onClick={() => decrementQuantity(product)}>-</button>
                      <span>{state.items.find(item => item.RowKey === `${product.RowKey}-${selectedSizes[product.RowKey] || 'A3'}`)?.quantity ?? 0}</span>
                      <button onClick={() => incrementQuantity(product)}>+</button>
                    </div>
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
















































































