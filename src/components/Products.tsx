import React, { useEffect } from 'react';
import { CartItemProps } from './CartItems';
import useCartActions from '../hooks/useCartActions'; // Import useCartActions hook
import './Products.css'; // Import the corresponding CSS file
import useFetchData from '../hooks/useFetchData'; // Import the useFetchData hook
import { Product } from '../apiService'; // Adjust import as needed

const Products: React.FC = () => {
  const { addItemToCart } = useCartActions(); // Access addItemToCart function from useCartActions hook
  const { data, isLoading, error } = useFetchData('https://joart.azurewebsites.net/GetProducts'); // Fetch products data

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
            <div key={product.RowKey} className="product-card">
              <img src={`data:image/jpeg;base64,${product.ProductImageBase64}`} alt={product.Name} className="product-image" />
              <div className="product-details">
                <p>{product.Name}</p>
                <p>${product.Price}</p>
                <button className="buy-btn" onClick={() => addItemToCart({
                  id: product.RowKey,
                  name: product.Name,
                  price: product.Price,
                  productImage: `data:image/jpeg;base64,${product.ProductImageBase64}`,
                  quantity: 1
                })}>
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














