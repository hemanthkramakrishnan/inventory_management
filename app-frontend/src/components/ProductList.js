import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    code: '',
    size: '',
    price: '',
    quantity_in_stock: ''
  });
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setIsAuthenticated(true);
      fetchProducts();
      fetchCategories();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchProducts = () => {
    axios.get('http://127.0.0.1:8000/api/inventory/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const fetchCategories = () => {
    axios.get('http://127.0.0.1:8000/api/inventory/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://127.0.0.1:8000/api/inventory/products/${editingProductId}/`
      : 'http://127.0.0.1:8000/api/inventory/products/';
    const method = isEditing ? 'put' : 'post';
    console.log("Submitting product data:", formData);

    axios({
      method,
      url,
      data: {
          description: formData.description,
          category_id: parseInt(formData.category_id),  // Ensure correct key and data type
          size: parseInt(formData.size),  // Ensure integer
          code: formData.code,
          price: parseFloat(formData.price),  // Ensure float
          quantity_in_stock: parseInt(formData.quantity_in_stock),  // Ensure integer
      },
      headers: {
         'Content-Type': 'application/json'
      }
      })
      .then(() => {
        fetchProducts();
        resetForm();
      })
      .catch(error => {
        console.error(`Error ${isEditing ? 'updating' : 'creating'} product:`, error);
      });
  };

  const handleEdit = (product) => {
    setFormData({
      description: product.description,
      category_id: product.category.id,
      size: parseInt(product.size),
      code: product.code,
      price: parseFloat(product.price),
      quantity_in_stock: product.quantity_in_stock,
    });
    setIsEditing(true);
    setEditingProductId(product.id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/inventory/products/${id}/`)
      .then(() => {
        fetchProducts();
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const resetForm = () => {
    setFormData({ description: '', category_id: '', size: '', code: '', price: '', quantity_in_stock: '' });
    setIsEditing(false);
    setEditingProductId(null);
  };

  if (!isAuthenticated) {
    return <p>Please log in to view and manage products.</p>;
  }

  return (
    <div className="container">
      <h2>Product List</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="size"
          placeholder="Size"
          value={formData.size}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="code"
          placeholder="Product Code"
          value={formData.code}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity_in_stock"
          placeholder="Quantity in Stock"
          value={formData.quantity_in_stock}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'} Product</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <table className="product-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Size</th>
            <th>Code</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.description}</td>
              <td>{product.category.name}</td>
              <td>{product.size}</td>
              <td>{product.code}</td>
              <td>{product.price}</td>
              <td>{product.quantity_in_stock}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
