import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WarehouseStock.css';

const WarehouseStock = ({ warehouseId }) => {
  const [stockItems, setStockItems] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/warehouses/${warehouseId}/stock/`)
      .then(response => {
        setStockItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching stock items:', error);
      });
  }, [warehouseId]);

  return (
    <div className="container">
      <h2>Warehouse Stock</h2>
      {stockItems.map(stock => (
        <div key={stock.id} className="stock-card">
          <h4>{stock.product.description}</h4>
          <p>Quantity: {stock.quantity}</p>
          <p>Warehouse: {stock.warehouse}</p>
        </div>
      ))}
    </div>
  );
};

export default WarehouseStock;