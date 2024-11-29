// src/components/WarehouseList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WarehouseList.css';

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [newWarehouse, setNewWarehouse] = useState({
    name: '',
    location: '',
    description: ''
  });

  useEffect(() => {
    fetchWarehouses();
  }, []);

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
    setNewWarehouse({ ...newWarehouse, [name]: value });
  };

  const handleAddWarehouse = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/warehouse/warehouses/', newWarehouse)
      .then(response => {
        setWarehouses([...warehouses, response.data]);
        setNewWarehouse({ name: '', location: '', description: '' });
      })
      .catch(error => {
        console.error('Error adding warehouse:', error);
      });
  };

  return (
    <div className="container">
      <h2>Warehouse List</h2>
      <form onSubmit={handleAddWarehouse} className="add-warehouse-form">
        <input
          type="text"
          name="name"
          placeholder="Warehouse Name"
          value={newWarehouse.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newWarehouse.location}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newWarehouse.description}
          onChange={handleInputChange}
        />
        <button type="submit">Add Warehouse</button>
      </form>
      <div className="warehouse-list">
        {warehouses.map((warehouse) => (
          <div key={warehouse.id} className="warehouse-card">
            <h3>{warehouse.name}</h3>
            <p><strong>Location:</strong> {warehouse.location}</p>
            <p><strong>Description:</strong> {warehouse.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WarehouseList;
