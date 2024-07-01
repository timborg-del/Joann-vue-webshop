import React, { useState, useEffect } from 'react';
import useCartActions from '../hooks/useCartActions';
import './Products.css';
import useFetchData from '../hooks/useFetchData';
import { Product } from '../apiService';
import { useCart, useCartDispatch } from '../context/CartContext';

const Products: React.FC = () => {
  const { addItemToCart } = useCartActions();
  const { data: products, isLoading, error } = useFetchData<Product[]>('https://joart.azurewebsites.net/GetProducts');
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const { state } = useCart();
  const dispatch = useCartDispatch();
  const [conversionRates, setConversionRates] = useState<{ [key: string]: number }>({});
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  const priceAdjustments: { [key: string]: number } = {
    A3: 0,
    A4: -2,
    A5: -5
  };

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/a1232edc656cf6fb88a4db06/latest/SEK');
        const data = await response.json();
        setConversionRates(data.conversion_rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes({ ...selectedSizes, [productId]: size });
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value);
  };

  const getPrice = (productId: string, basePrice: number) => {
    const size = selectedSizes[productId] || 'A3';
    const adjustment = priceAdjustments[size] || 0;
    const priceInSek = basePrice + adjustment;
    const rate = conversionRates[selectedCurrency] || 1;
    const priceInSelectedCurrency = priceInSek * rate;
    return priceInSelectedCurrency.toFixed(2);
  };

  const handleAddToCart = (product: Product) => {
    const size = selectedSizes[product.RowKey] || 'A3';
    const uniqueId = `${product.RowKey}-${size}`;
    addItemToCart({
      ...product,
      RowKey: uniqueId,
      Price: parseFloat(getPrice(product.RowKey, product.Price)),
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
      addItemToCart(product);
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
                </div>
              )}
              {activeProduct === product.RowKey && (
                <div className="product-details-dropdown">
                  <div className="product-info">
                  <div className="currency-selector">
                    <label htmlFor="currency">Select Currency:</label>
                    <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
                      {Object.keys(conversionRates).map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </div>
                    <p><strong>Name:</strong> {product.Name}</p>
                    <p><strong>Price:</strong> {selectedCurrency} {getPrice(product.RowKey, product.Price)}</p>
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
                  <div className="quantity-controls">
                      <button onClick={() => decrementQuantity(product)}>-</button>
                      <span>{state.items.find(item => item.RowKey === `${product.RowKey}-${selectedSizes[product.RowKey] || 'A3'}`)?.quantity ?? 0}</span>
                      <button onClick={() => incrementQuantity(product)}>+</button>
                    </div>
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


































































