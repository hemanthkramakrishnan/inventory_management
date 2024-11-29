// src/components/StockList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockList.css';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({
    product: '',
    quantity: '',
    warehouse: ''
  });
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    fetchStocks();
    fetchWarehouses();
  }, []);

  const fetchStocks = () => {
    axios.get('http://127.0.0.1:8000/api/warehouse/stocks/')
      .then(response => {
        setStocks(response.data);
      })
      .catch(error => {
        console.error('Error fetching stocks:', error);
      });
  };

  const fetchWarehouses = () => {
    axios.get('http://127.0.0.1:8000/api/warehouse/warehouses/')
      .then(response => {
        setWarehouses(response.data);
      })
      .catch(error => {
        console.error('Error fetching warehouses:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });
  };

  const handleAddStock = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/warehouse/stocks/', newStock)
      .then(response => {
        setStocks([...stocks, response.data]);
        setNewStock({ product: '', quantity: '', warehouse: '' });
      })
      .catch(error => {
        console.error('Error adding stock:', error);
      });
  };

  return (
    <div className="container">
      <h2>Stock List</h2>
      <form onSubmit={handleAddStock} className="add-stock-form">
        <input
          type="text"
          name="product"
          placeholder="Product Name"
          value={newStock.product}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newStock.quantity}
          onChange={handleInputChange}
          required
        />
        <select name="warehouse" value={newStock.warehouse} onChange={handleInputChange} required>
          <option value="">Select Warehouse</option>
          {warehouses.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
          ))}
        </select>
        <button type="submit">Add Stock</button>
      </form>
      <div className="stock-list">
        {stocks.map((stock) => (
          <div key={stock.id} className="stock-card">
            <h3>Product: {stock.product}</h3>
            <p><strong>Quantity:</strong> {stock.quantity}</p>
            <p><strong>Warehouse:</strong> {stock.warehouse.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockList;
