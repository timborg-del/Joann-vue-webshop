import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './AdminPage.css'; // Import CSS file for styling
import { addProduct, getProducts, Product, updateProduct, deleteProduct, addShowroomImage, getShowroomImages, ShowroomImage, deleteShowroomImage } from '../apiService';
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
    AdditionalImages: [],
    quantity: 0, // Default value
    size: '', // Default value
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newShowroomImage, setNewShowroomImage] = useState<ShowroomImage>({
    PartitionKey: 'showroom',
    RowKey: '',
    Title: '',
    Description: '',
    ImageUrl: ''
  });
  const [showroomImages, setShowroomImages] = useState<ShowroomImage[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentView, setCurrentView] = useState<'dashboard' | 'products' | 'add' | 'edit' | 'showroom' | 'addShowroomImage'>('dashboard');
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [imageUrlFile, setImageUrlFile] = useState<File | null>(null);
  const [, setToken] = useLocalStorage<string | null>('token', null);
  const navigate = useNavigate();

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
      setSelectedFiles(e.target.files);
    }
  };

  const handleImageUrlFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageUrlFile(e.target.files[0]);
    }
  };

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageUrlFile) {
      setError('Please select an image file for ImageUrl.');
      return;
    }

    try {
      const productToAdd = {
        ...newProduct,
        RowKey: Date.now().toString(),
        AdditionalImages: [], // Initialize as an empty array
      };

      await addProduct(productToAdd, imageUrlFile, selectedFiles);
      setProducts([...products, productToAdd]);
      setNewProduct({
        PartitionKey: 'product',
        RowKey: '',
        Name: '',
        Price: 0,
        Stock: 0,
        Category: '',
        ImageUrl: '',
        AdditionalImages: [],
        quantity: 0, // Reset quantity
        size: '', // Reset size
      });
      setSelectedFiles(null);
      setImageUrlFile(null);
      setCurrentView('products');
      setError(null);
    } catch (err) {
      setError('Failed to add product');
    }
  };

  const handleUpdateProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      await updateProduct(editingProduct, imageUrlFile, selectedFiles);
      const updatedProducts = products.map(p => (p.RowKey === editingProduct.RowKey ? editingProduct : p));
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
        AdditionalImages: [],
        quantity: 0, // Reset quantity
        size: '', // Reset size
      });
      setSelectedFiles(null);
      setImageUrlFile(null);
      setCurrentView('products');
      setError(null);
    } catch (err) {
      setError('Failed to update product');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setCurrentView('edit');
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

  const handleDeleteShowroomImage = async (partitionKey: string, rowKey: string) => {
    try {
      await deleteShowroomImage(partitionKey, rowKey);
      const updatedImages = showroomImages.filter(image => image.PartitionKey !== partitionKey || image.RowKey !== rowKey);
      setShowroomImages(updatedImages);
    } catch (err) {
      setError('Failed to delete showroom image');
    }
  };

  const handleAddShowroomImage = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      setError('Please select an image file.');
      return;
    }

    try {
      const file = selectedFiles[0];
      await addShowroomImage(newShowroomImage, file);
      setShowroomImages([...showroomImages, newShowroomImage]);
      setNewShowroomImage({
        PartitionKey: 'showroom',
        RowKey: '',
        Title: '',
        Description: '',
        ImageUrl: ''
      });
      setSelectedFiles(null);
      setCurrentView('showroom');
      setError(null);
    } catch (err) {
      setError('Failed to add showroom image');
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
            AdditionalImages: [],
            quantity: 0, // Reset quantity
            size: '', // Reset size
          });
          setSelectedFiles(null);
          setImageUrlFile(null);
          setCurrentView('add');
        }}>Add New Product</button>
        <button onClick={() => setCurrentView('showroom')}>Showroom</button>
        <button onClick={() => {
          setNewShowroomImage({
            PartitionKey: 'showroom',
            RowKey: '',
            Title: '',
            Description: '',
            ImageUrl: ''
          });
          setSelectedFiles(null);
          setCurrentView('addShowroomImage');
        }}>Add Showroom Image</button>
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
              placeholder="Search products"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
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
            <input type="file" onChange={handleImageUrlFileChange} required={currentView === 'add'} />
            <input type="file" multiple onChange={handleFileChange} />
            <button type="submit">{currentView === 'add' ? 'Add Product' : 'Update Product'}</button>
          </form>
        )}
        {currentView === 'showroom' && (
          <div className="showroom-list">
            <h2>Showroom Images</h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {showroomImages.map((image) => (
                  <tr key={image.RowKey}>
                    <td>{image.Title}</td>
                    <td>{image.Description}</td>
                    <td>
                      <img src={image.ImageUrl} alt={image.Title} style={{ width: '100px', borderRadius: '8px' }} />
                    </td>
                    <td>
                      <button onClick={() => handleDeleteShowroomImage(image.PartitionKey, image.RowKey)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {currentView === 'addShowroomImage' && (
          <form className="showroom-form" onSubmit={handleAddShowroomImage}>
            <h2>Add Showroom Image</h2>
            {error && <div className="error">{error}</div>}
            <input
              type="text"
              name="Title"
              value={newShowroomImage.Title}
              onChange={(e) => setNewShowroomImage({ ...newShowroomImage, Title: e.target.value })}
              placeholder="Image Title"
              required
            />
            <input
              type="text"
              name="Description"
              value={newShowroomImage.Description}
              onChange={(e) => setNewShowroomImage({ ...newShowroomImage, Description: e.target.value })}
              placeholder="Image Description"
              required
            />
            <input type="file" onChange={handleFileChange} required />
            <button type="submit">Add Showroom Image</button>
          </form>
        )}
      </main>
      <footer>
        <p>&copy; 2024 Jo's Art. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminPage;




















