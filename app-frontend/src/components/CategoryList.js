import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/inventory/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div className="container">
      <h2>Category List</h2>
      {categories.map(category => (
        <div key={category.id} className="category-card">
          <h3>{category.name}</h3>
          <p>{category.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;