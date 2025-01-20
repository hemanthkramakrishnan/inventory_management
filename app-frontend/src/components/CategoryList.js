import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setIsAuthenticated(true);
      fetchCategories();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchCategories = () => {
    axios.get('http://127.0.0.1:8000/api/inventory/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle create or update submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      axios.put(`http://127.0.0.1:8000/api/inventory/categories/${editingCategoryId}/`, formData)
        .then(() => {
          fetchCategories();
          resetForm();
        })
        .catch(error => {
          console.error('Error updating category:', error);
        });
    } else {
      axios.post('http://127.0.0.1:8000/api/inventory/categories/', formData)
        .then(() => {
          fetchCategories();
          resetForm();
        })
        .catch(error => {
          console.error('Error creating category:', error);
        });
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/inventory/categories/${id}/`)
      .then(() => {
        fetchCategories();
      })
      .catch(error => {
        console.error('Error deleting category:', error);
      });
  };

  // Handle edit
  const handleEdit = (category) => {
    setFormData({ name: category.name, description: category.description });
    setIsEditing(true);
    setEditingCategoryId(category.id);
  };

  // Reset form
  const resetForm = () => {
    setFormData({ name: '', description: '' });
    setIsEditing(false);
    setEditingCategoryId(null);
  };

  return (
    <div className="container">
      <h2>Category List</h2>
      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Category Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'} Category</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <table className="category-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <button onClick={() => handleEdit(category)}>Edit</button>
                    <button onClick={() => handleDelete(category.id)}>Delete</button>
                  </td>
                </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
