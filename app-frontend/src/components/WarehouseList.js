// src/components/WarehouseList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WarehouseList.css';

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [editingWarehouseId, setEditingWarehouseId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newWarehouse, setNewWarehouse] = useState({
    name: '',
    location: '',
    description: ''
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setIsAuthenticated(true);
      fetchWarehouses();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchWarehouses = () => {
    axios.get('http://127.0.0.1:8000/api/inventory/warehouses/')
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
    if (editingWarehouseId) {
      axios.put(`http://127.0.0.1:8000/api/inventory/warehouses/${editingWarehouseId}/`, newWarehouse)
        .then(response => {
          setWarehouses(warehouses.map(warehouse => warehouse.id === editingWarehouseId ? response.data : warehouse));
          resetForm();
        })
        .catch(error => {
          console.error('Error updating warehouse:', error);
        });
    } else {
      axios.post('http://127.0.0.1:8000/api/inventory/warehouses/', newWarehouse)
        .then(response => {
          setWarehouses([...warehouses, response.data]);
          resetForm();
        })
        .catch(error => {
          console.error('Error adding warehouse:', error);
        });
    }
  };

  const handleEdit = (warehouse) => {
    setNewWarehouse({
      name: warehouse.name,
      location: warehouse.location,
      description: warehouse.description
    });
    setEditingWarehouseId(warehouse.id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/inventory/warehouses/${id}/`)
      .then(() => {
        setWarehouses(warehouses.filter(warehouse => warehouse.id !== id));
      })
      .catch(error => {
        console.error('Error deleting warehouse:', error);
      });
  };

  const resetForm = () => {
    setNewWarehouse({ name: '', location: '', description: '' });
    setEditingWarehouseId(null);
  };

  if (!isAuthenticated) {
    return <p>Please log in to view and manage warehouses.</p>;
  }

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
        <button type="submit">{editingWarehouseId ? 'Update' : 'Add'} Warehouse</button>
        {editingWarehouseId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <table className="warehouse-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse) => (
                <tr key={warehouse.id}>
                  <td>{warehouse.name}</td>
                  <td>{warehouse.location}</td>
                  <td>{warehouse.description}</td>
                  <td>
                    <button onClick={() => handleEdit(warehouse)}>Edit</button>
                    <button onClick={() => handleDelete(warehouse.id)}>Delete</button>
                  </td>
                </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
};

export default WarehouseList;
