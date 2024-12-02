import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/inventory/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="container">
      <h2>Product List</h2>
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h4>{product.description}</h4>
          <p>Category: {product.category.name}</p>
          <p>Size: {product.size}</p>
          <p>Price: {product.price}</p>
          <p>Quantity in Stock: {product.quantity_in_stock}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;