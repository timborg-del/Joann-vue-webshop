import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './AdminPage.css'; // Import CSS file for styling
import { addProduct, getProducts, Product, updateProduct, deleteProduct } from '../apiService';
import { uploadShowroomImage, getShowroomImages, deleteShowroomImage } from '../apiService'; // Import new API functions
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    PartitionKey: 'product',
    RowKey: '',
    Name: '',
    Price: 0,
    Stock: 0,
    Category: '',
    ImageUrl: '',
    quantity: 0, // Default value
    size: '', // Default value
  });
  const [, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentView, setCurrentView] = useState<'dashboard' | 'products' | 'add' | 'edit' | 'showroom'>('dashboard');
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [, setToken] = useLocalStorage<string | null>('token', null);
  const navigate = useNavigate();
  const [showroomImages, setShowroomImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        if (Array.isArray(products)) {
          setProducts(products);
        } else {
          setError('Unexpected data format');
        }
      } catch (err) {
        setError('Failed to fetch products');
      }
    };

    const fetchShowroomImages = async () => {
      try {
        const images = await getShowroomImages();
        setShowroomImages(images);
      } catch (err) {
        setError('Failed to fetch showroom images');
      }
    };

    fetchProducts();
    fetchShowroomImages();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'Price' || name === 'Stock' || name === 'quantity') {
      setNewProduct({ ...newProduct, [name]: parseFloat(value) });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    try {
      const productToAdd = { ...newProduct, RowKey: Date.now().toString() };
      await addProduct(productToAdd, selectedFile);
      setProducts([...products, productToAdd]);
      setNewProduct({
        PartitionKey: 'product',
        RowKey: '',
        Name: '',
        Price: 0,
        Stock: 0,
        Category: '',
        ImageUrl: '',
        quantity: 0, // Reset quantity
        size: '', // Reset size
      });
      setSelectedFile(null);
      setCurrentView('products');
      setError(null);
    } catch (err) {
      setError('Failed to add product');
    }
  };

  const handleAddShowroomImage = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    try {
      const imageUrl = await uploadShowroomImage(selectedFile);
      setShowroomImages([...showroomImages, imageUrl]);
      setSelectedFile(null);
      setCurrentView('showroom');
      setError(null);
    } catch (err) {
      setError('Failed to upload showroom image');
    }
  };

  const handleDeleteShowroomImage = async (imageUrl: string) => {
    try {
      await deleteShowroomImage(imageUrl);
      const updatedImages = showroomImages.filter(image => image !== imageUrl);
      setShowroomImages(updatedImages);
    } catch (err) {
      setError('Failed to delete showroom image');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setCurrentView('edit');
  };

  const handleUpdateProduct = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateProduct(newProduct);
      const updatedProducts = products.map(p => (p.RowKey === newProduct.RowKey ? newProduct : p));
      setProducts(updatedProducts);
      setEditingProduct(null);
      setNewProduct({
        PartitionKey: 'product',
        RowKey: '',
        Name: '',
        Price: 0,
        Stock: 0,
        Category: '',
        ImageUrl: '',
        quantity: 0, // Reset quantity
        size: '', // Reset size
      });
      setCurrentView('products');
      setError(null);
    } catch (err) {
      setError('Failed to update product');
    }
  };

  const handleDeleteProduct = async (partitionKey: string, rowKey: string) => {
    try {
      await deleteProduct(partitionKey, rowKey);
      const updatedProducts = products.filter(product => product.RowKey !== rowKey);
      setProducts(updatedProducts);
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const handleLogout = () => {
    setToken(null); // Clear the token from local storage
    navigate('/login'); // Navigate to the login page
  };

  const filteredProducts = products.filter(product =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h1>Admin Page</h1>

      <header className='admin-header'>
        <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <aside>
        <button onClick={() => setCurrentView('products')}>Products</button>
        <button onClick={() => setCurrentView('showroom')}>Showroom</button>
        <button onClick={() => {
          setEditingProduct(null);
          setNewProduct({
            PartitionKey: 'product',
            RowKey: '',
            Name: '',
            Price: 0,
            Stock: 0,
            Category: '',
            ImageUrl: '',
            quantity: 0, // Reset quantity
            size: '', // Reset size
          });
          setSelectedFile(null);
          setCurrentView('add');
        }}>Add New Product</button>
      </aside>
      <main>
        {currentView === 'dashboard' && (
          <div className="dashboard">
            <h2>Dashboard</h2>
            <p>Total Products: {products.length}</p>
            <p>Low Stock Alerts: {products.filter(product => product.Stock < 5).length}</p>
          </div>
        )}
        {currentView === 'products' && (
          <div className="product-list">
            <h2>Product List</h2>
            <input
              type="text"
              placeholder="Search products by name"
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.RowKey}>
                    <td>{product.Name}</td>
                    <td>{product.Price}</td>
                    <td>{product.Stock}</td>
                    <td>{product.Category}</td>
                    <td>
                      <button onClick={() => handleEditProduct(product)}>Edit</button>
                      <button onClick={() => handleDeleteProduct(product.PartitionKey, product.RowKey)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {(currentView === 'add' || currentView === 'edit') && (
          <form className="product-form" onSubmit={currentView === 'add' ? handleAddProduct : handleUpdateProduct}>
            <h2>{currentView === 'add' ? 'Add New Product' : 'Edit Product'}</h2>
            {error && <div className="error">{error}</div>}
            <input
              type="text"
              name="Name"
              value={newProduct.Name}
              onChange={handleInputChange}
              placeholder="Product Name"
              required
            />
            <input
              type="number"
              name="Price"
              value={newProduct.Price}
              onChange={handleInputChange}
              placeholder="Price"
              required
            />
            <input
              type="number"
              name="Stock"
              value={newProduct.Stock}
              onChange={handleInputChange}
              placeholder="Stock"
              required
            />
            <input
              type="text"
              name="Category"
              value={newProduct.Category}
              onChange={handleInputChange}
              placeholder="Category"
              required
            />
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              required
            />
            <input
              type="text"
              name="size"
              value={newProduct.size}
              onChange={handleInputChange}
              placeholder="Size"
            />
            <input type="file" onChange={handleFileChange} required={currentView === 'add'} />
            <button type="submit">{currentView === 'add' ? 'Add Product' : 'Update Product'}</button>
          </form>
        )}
        {currentView === 'showroom' && (
          <div className="showroom-upload">
            <h2>Showroom Images</h2>
            <form onSubmit={handleAddShowroomImage}>
              {error && <div className="error">{error}</div>}
              <input type="file" onChange={handleFileChange} required />
              <button type="submit">Upload Image</button>
            </form>
            <div className="showroom-list">
              {showroomImages.map((image, index) => (
                <div key={index} className="showroom-image-item">
                  <img src={image} alt={`Showroom ${index}`} />
                  <button onClick={() => handleDeleteShowroomImage(image)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <footer>
        <p>&copy; 2024 Jo`s Art. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminPage;









