import React, { useState, ChangeEvent, FormEvent } from 'react';
import './AdminPage.css'; // Import CSS file for styling

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: File | null;
}

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    // Example initial product data
    { id: 1, name: 'Product 1', price: 10, stock: 5, category: 'Category 1', image: null },
    { id: 2, name: 'Product 2', price: 15, stock: 2, category: 'Category 2', image: null }
  ]);
  const [newProduct, setNewProduct] = useState<Product>({ id: 0, name: '', price: 0, stock: 0, category: '', image: null });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentView, setCurrentView] = useState<'dashboard' | 'products' | 'add' | 'edit'>('dashboard');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewProduct({ ...newProduct, image: e.target.files[0] });
    }
  };

  const handleAddProduct = (e: FormEvent) => {
    e.preventDefault();
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({ id: 0, name: '', price: 0, stock: 0, category: '', image: null });
    setCurrentView('products');
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setCurrentView('edit');
  };

  const handleUpdateProduct = (e: FormEvent) => {
    e.preventDefault();
    setProducts(products.map(product => product.id === editingProduct!.id ? newProduct : product));
    setEditingProduct(null);
    setNewProduct({ id: 0, name: '', price: 0, stock: 0, category: '', image: null });
    setCurrentView('products');
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          setNewProduct({ id: 0, name: '', price: 0, stock: 0, category: '', image: null });
          setCurrentView('add');
        }}>Add New Product</button>
      </aside>
      <main>
        {currentView === 'dashboard' && (
          <div className="dashboard">
            <h2>Dashboard</h2>
            <p>Total Products: {products.length}</p>
            <p>Low Stock Alerts: {products.filter(product => product.stock < 5).length}</p>
          </div>
        )}
        {currentView === 'products' && (
          <div className="product-list">
            <h2>Product List</h2>
            <input
              type="text"
              placeholder="Search products"
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
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.category}</td>
                    <td>
                      <button onClick={() => handleEditProduct(product)}>Edit</button>
                      <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
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
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Product Name"
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Price"
            />
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleInputChange}
              placeholder="Stock"
            />
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              placeholder="Category"
            />
            <input type="file" name="image" onChange={handleFileChange} />
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




