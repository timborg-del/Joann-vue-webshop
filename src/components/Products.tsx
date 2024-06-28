import { useState, useEffect } from 'react';
import useCartActions from '../hooks/useCartActions';
import './Products.css';
import useFetchData from '../hooks/useFetchData';
import { Product } from '../apiService';
import StarRating from './StarRating';
import { useCart, useCartDispatch } from '../context/CartContext';
import { submitReview } from '../apiService';

const Products: React.FC = () => {
  const { addItemToCart } = useCartActions();
  const { data: products, isLoading, error } = useFetchData<Product[]>('https://joart.azurewebsites.net/GetProducts');
  const [reviews, setReviews] = useState<{ [key: string]: any[] }>({});
  const [newReview, setNewReview] = useState({ user: '', comment: '', rating: 0 });
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const { state } = useCart();
  const dispatch = useCartDispatch();

  const priceAdjustments: { [key: string]: number } = {
    A3: 0,
    A4: -2,
    A5: -5
  };

  useEffect(() => {
    if (products) {
      products.forEach(product => {
        fetchReviews(product.RowKey);
      });
    }
  }, [products]);

  const fetchReviews = async (productId: string) => {
    try {
      const response = await fetch(`https://joart.azurewebsites.net/products/${productId}/reviews`);
      const data = await response.json();
      setReviews(prev => ({ ...prev, [productId]: data }));
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
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

  const incrementQuantity = (productId: string) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: productId });
  };

  const decrementQuantity = (productId: string) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: productId });
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = async (productId: string) => {
    try {
      await submitReview(productId, newReview.user, newReview.rating, newReview.comment);
      fetchReviews(productId);
      setNewReview({ user: '', comment: '', rating: 0 });
    } catch (error) {
      console.error('Error submitting review:', error);
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
                  <div className="product-reviews">
                    <StarRating rating={product.rating || 0} />
                  </div>
                </div>
              )}
              {activeProduct === product.RowKey && (
                <div className="product-details-dropdown">
                  <div className="product-info">
                    <p><strong>Name:</strong> {product.Name}</p>
                    <p><strong>Price:</strong> ${getPrice(product.RowKey, product.Price).toFixed(2)}</p>
                    <p><strong>Category:</strong> {product.Category}</p>
                    <div className="quantity-controls">
                      <button onClick={() => decrementQuantity(product.RowKey)}>-</button>
                      <span>{state.items.find(item => item.RowKey === product.RowKey)?.quantity ?? 0}</span>
                      <button onClick={() => incrementQuantity(product.RowKey)}>+</button>
                    </div>
                  </div>
                  <div className="product-reviews">
                    <StarRating rating={product.rating || 0} />
                    <h3>Reviews</h3>
                    {reviews[product.RowKey]?.length > 0 ? (
                      reviews[product.RowKey].map((review, index) => (
                        <div key={index} className="review">
                          <p><strong>User:</strong> {review.user}</p>
                          <p><strong>Comment:</strong> {review.comment}</p>
                          <StarRating rating={review.rating} />
                        </div>
                      ))
                    ) : (
                      <p>No reviews yet.</p>
                    )}
                    <div className="review-form">
                      <h4>Leave a Review</h4>
                      <input
                        type="text"
                        name="user"
                        placeholder="Your Name"
                        value={newReview.user}
                        onChange={handleReviewChange}
                      />
                      <textarea
                        name="comment"
                        placeholder="Your Comment"
                        value={newReview.comment}
                        onChange={handleReviewChange}
                      />
                      <StarRating rating={newReview.rating} setRating={(rating) => setNewReview(prev => ({ ...prev, rating }))} />
                      <button onClick={() => handleSubmitReview(product.RowKey)}>Submit Review</button>
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



























































