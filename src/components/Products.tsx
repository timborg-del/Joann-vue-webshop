import React, { useState, useEffect, useRef } from 'react';
import { CartItemProps } from './CartItems';
import useCartActions from '../hooks/useCartActions';
import './Products.css';
import useFetchData from '../hooks/useFetchData';
import { Product } from '../apiService';
import { useCart, useCartDispatch } from '../context/CartContext';

interface Review {
  id: number;
  user: string;
  comment: string;
  rating: number;
}

interface MockReviews {
  [key: string]: Review[];
}

const Products: React.FC = () => {
  const { state } = useCart();
  const dispatch = useCartDispatch();
  const { addItemToCart } = useCartActions();
  const { data, isLoading, error } = useFetchData('https://joart.azurewebsites.net/GetProducts');

  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const magnifierGlassRef = useRef<HTMLDivElement | null>(null);
  const magnifierImageRef = useRef<HTMLImageElement | null>(null);
  const [showReviews, setShowReviews] = useState<boolean>(false);

  const priceAdjustments: { [key: string]: number } = {
    A3: 0,
    A4: -2,
    A5: -5
  };

  const mockReviews: MockReviews = {
    "product1": [
      { id: 1, user: "John Doe", comment: "Great product!", rating: 5 },
      { id: 2, user: "Jane Smith", comment: "Good quality.", rating: 4 }
    ],
    "product2": [
      { id: 1, user: "Alice Johnson", comment: "Loved it!", rating: 5 },
      { id: 2, user: "Bob Brown", comment: "Not bad.", rating: 3 }
    ]
  };

  const toggleDetails = (productId: string) => {
    setActiveProduct(activeProduct === productId ? null : productId);
  };

  const closeDetails = () => {
    setActiveProduct(null);
    setShowReviews(false);
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
    const adjustment = priceAdjustments[size] || 0;
    return basePrice + adjustment;
  };

  const handleAddToCart = (product: CartItemProps & Product) => {
    const size = selectedSizes[product.RowKey] || 'A3';
    const uniqueId = `${product.RowKey}-${size}`;
    addItemToCart({
      id: uniqueId,
      name: product.Name,
      price: getPrice(product.RowKey, product.Price),
      ImageUrl: product.ImageUrl,
      quantity: 1,
      size: size
    });
  };

  const decrementQuantity = (itemId: string) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: itemId });
  };

  const incrementQuantity = (itemId: string) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: itemId });
  };

  const getProductQuantity = (productId: string, size: string) => {
    const cartItem = state.items.find(item => item.id === `${productId}-${size}`);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>, productImageUrl: string) => {
    const magnifierGlass = magnifierGlassRef.current;
    const magnifierImage = magnifierImageRef.current;
    if (magnifierGlass && magnifierImage) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      magnifierGlass.style.left = `${x - magnifierGlass.offsetWidth / 0}px`;
      magnifierGlass.style.top = `${y - magnifierGlass.offsetHeight / 0}px`;

      magnifierImage.src = productImageUrl;
      magnifierImage.style.left = `${-x * 3 + magnifierGlass.offsetWidth / 0}px`;
      magnifierImage.style.top = `${-y * 3 + magnifierGlass.offsetHeight / 0}px`;
    }
  };

  const handleImageClick = (productImageUrl: string) => {
    setEnlargedImage(productImageUrl);
  };

  const renderStars = (rating: number) => {
    return (
      <span className="star-rating">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </span>
    );
  };

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

  const productsArray: (CartItemProps & Product)[] = data;

  return (
    <div className="products-container">
      {productsArray.length > 0 ? (
        productsArray.map((product) => (
          <div 
            key={product.RowKey} 
            className={`product-wrapper ${activeProduct === product.RowKey ? 'active' : ''}`}
          >
            <div className={`product-card ${activeProduct === product.RowKey ? 'active' : ''}`}>
              {activeProduct === product.RowKey ? (
                <div className="product-image-container">
                  <button className="close-button" onClick={closeDetails}>&times;</button>
                  <img 
                    src={product.ImageUrl}
                    alt={product.Name}
                    className="product-image"
                    onError={(e) => {
                      e.currentTarget.src = '/path/to/placeholder-image.jpg';
                      console.error("Image load error", e);
                    }}
                    onMouseMove={(e) => handleMouseMove(e, product.ImageUrl)}
                    onMouseLeave={() => {
                      if (magnifierGlassRef.current) magnifierGlassRef.current.style.display = 'none';
                    }}
                    onMouseEnter={() => {
                      if (magnifierGlassRef.current) magnifierGlassRef.current.style.display = 'block';
                    }}
                    onClick={() => handleImageClick(product.ImageUrl)}
                  />
                  <div className="magnifier-glass" ref={magnifierGlassRef}>
                    <img ref={magnifierImageRef} alt="magnified" />
                  </div>
                </div>
              ) : (
                <div className="product-thumbnail" onClick={() => toggleDetails(product.RowKey)}>
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
                  <div className="product-reviews">
                    {mockReviews[product.RowKey]?.slice(0, 1).map((review) => (
                      <div key={review.id}>
                        <p><strong>{review.user}:</strong> {review.comment}</p>
                        {renderStars(review.rating)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeProduct === product.RowKey && (
                <div className="product-details-dropdown">
                  <div className="product-info">
                    <p><strong>Name:</strong> {product.Name}</p>
                    <p><strong>Price:</strong> ${getPrice(product.RowKey, product.Price).toFixed(2)}</p>
                    <p><strong>Stock:</strong> {product.Stock}</p>
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
                  <div className="quantity-buttons">
                    <button onClick={() => decrementQuantity(`${product.RowKey}-${selectedSizes[product.RowKey] || 'A3'}`)}>-</button>
                    <span>{getProductQuantity(product.RowKey, selectedSizes[product.RowKey] || 'A3')}</span>
                    <button onClick={() => incrementQuantity(`${product.RowKey}-${selectedSizes[product.RowKey] || 'A3'}`)}>+</button>
                  </div>
                  <div className="product-reviews">
                    <button onClick={() => setShowReviews(!showReviews)}>
                      {showReviews ? "Hide Reviews" : "Show Reviews"}
                    </button>
                    {showReviews && (
                      <div>
                        {mockReviews[product.RowKey]?.map((review) => (
                          <div key={review.id}>
                            <p><strong>{review.user}:</strong> {review.comment}</p>
                            {renderStars(review.rating)}
                          </div>
                        ))}
                      </div>
                    )}
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
































