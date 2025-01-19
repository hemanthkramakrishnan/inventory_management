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
  const [editingStockId, setEditingStockId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setIsAuthenticated(true);
      fetchStocks();
      fetchWarehouses();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchStocks = () => {
    axios.get('http://127.0.0.1:8000/api/inventory/stock/')
      .then(response => {
        setStocks(response.data);
      })
      .catch(error => {
        console.error('Error fetching stocks:', error);
      });
  };

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
    setNewStock({ ...newStock, [name]: value });
  };

  const handleAddOrUpdateStock = (e) => {
    e.preventDefault();
    if (editingStockId) {
      axios.put(`http://127.0.0.1:8000/api/inventory/stock/${editingStockId}/`, newStock)
        .then(response => {
          setStocks(stocks.map(stock => stock.id === editingStockId ? response.data : stock));
          resetForm();
        })
        .catch(error => {
          console.error('Error updating stock:', error);
        });
    } else {
      axios.post('http://127.0.0.1:8000/api/inventory/stock/', newStock)
        .then(response => {
          setStocks([...stocks, response.data]);
          resetForm();
        })
        .catch(error => {
          console.error('Error adding stock:', error);
        });
    }
  };

  const handleEdit = (stock) => {
    setNewStock({
      product: stock.product.code,
      quantity: stock.quantity,
      warehouse: stock.warehouse
    });
    setEditingStockId(stock.id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/inventory/stock/${id}/`)
      .then(() => {
        setStocks(stocks.filter(stock => stock.id !== id));
      })
      .catch(error => {
        console.error('Error deleting stock:', error);
      });
  };

  const resetForm = () => {
    setNewStock({ product: '', quantity: '', warehouse: '' });
    setEditingStockId(null);
  };

  if (!isAuthenticated) {
    return <p>Please log in to view and manage stocks.</p>;
  }

  return (
    <div className="container">
      <h2>Stock List</h2>
      <form onSubmit={handleAddOrUpdateStock} className="add-stock-form">
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
        <button type="submit">{editingStockId ? 'Update' : 'Add'} Stock</button>
        {editingStockId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <table className="stock-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Warehouse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.product.code}</td>
              <td>{stock.quantity}</td>
              <td>{stock.warehouse}</td>
              <td>
                <button onClick={() => handleEdit(stock)}>Edit</button>
                <button onClick={() => handleDelete(stock.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
