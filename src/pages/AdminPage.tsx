import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './AdminPage.css'; // Import CSS file for styling
import { addProduct, getProducts, Product } from '../apiService';

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    PartitionKey: 'product',
    RowKey: '',
    Name: '',
    Price: 0,
    Stock: 0,
    Category: '',
    ProductImageBase64: ''
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentView, setCurrentView] = useState<'dashboard' | 'products' | 'add' | 'edit'>('dashboard');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (err) {
        setError('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, ProductImageBase64: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const productToAdd = { ...newProduct, RowKey: Date.now().toString() };
      await addProduct(productToAdd);
      setProducts([...products, productToAdd]);
      setNewProduct({
        PartitionKey: 'product',
        RowKey: '',
        Name: '',
        Price: 0,
        Stock: 0,
        Category: '',
        ProductImageBase64: ''
      });
      setCurrentView('products');
      setError(null);
    } catch (err) {
      setError('Failed to add product');
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
      await addProduct(newProduct); // Assuming the addProduct API can handle both add and update operations
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
        ProductImageBase64: ''
      });
      setCurrentView('products');
      setError(null);
    } catch (err) {
      setError('Failed to update product');
    }
  };

  const handleDeleteProduct = async (rowKey: string) => {
    try {
      // Implement delete logic here using your deleteProduct API
      const updatedProducts = products.filter(product => product.RowKey !== rowKey);
      setProducts(updatedProducts);
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(product =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <header>
        <h1>Admin Page</h1>
        <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
      </header>
      <aside>
        <button onClick={() => setCurrentView('products')}>Products</button>
        <button onClick={() => {
          setEditingProduct(null);
          setNewProduct({
            PartitionKey: 'product',
            RowKey: '',
            Name: '',
            Price: 0,
            Stock: 0,
            Category: '',
            ProductImageBase64: ''
          });
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
                {filteredProducts.map(product => (
                  <tr key={product.RowKey}>
                    <td>{product.Name}</td>
                    <td>{product.Price}</td>
                    <td>{product.Stock}</td>
                    <td>{product.Category}</td>
                    <td>
                      <button onClick={() => handleEditProduct(product)}>Edit</button>
                      <button onClick={() => handleDeleteProduct(product.RowKey)}>Delete</button>
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
            <input type="file" onChange={handleFileChange} />
            <button type="submit">{currentView === 'add' ? 'Add Product' : 'Update Product'}</button>
          </form>
        )}
      </main>
      <footer>
        <p>&copy; 2024 Jo`s Art. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminPage;







