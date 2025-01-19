import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockList.css';

const StockList = () => {
    const [stocks, setStocks] = useState([]);
    const [formData, setFormData] = useState({product_id: '', quantity: '', warehouse: '' });
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingStockId, setEditingStockId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            setIsAuthenticated(true);
            fetchStocks();
            fetchProducts();
            fetchWarehouses();
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const fetchStocks = () => {
        axios.get('http://127.0.0.1:8000/api/inventory/stock/')
            .then(response => setStocks(response.data))
            .catch(error => console.error('Error fetching stocks:', error));
    };

    const fetchProducts = () => {
        axios.get('http://127.0.0.1:8000/api/inventory/products/')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    };

    const fetchWarehouses = () => {
        axios.get('http://127.0.0.1:8000/api/inventory/warehouses/')
            .then(response => setWarehouses(response.data))
            .catch(error => console.error('Error fetching warehouses:', error));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEditing
            ? `http://127.0.0.1:8000/api/inventory/stock/${editingStockId}/`
            : 'http://127.0.0.1:8000/api/inventory/stock/';
        const method = isEditing ? 'put' : 'post';

        const stockData = {
            product_id: parseInt(formData.product_id),
            quantity: Number(formData.quantity),  // Ensure quantity is sent as an integer
            warehouse: parseInt(formData.warehouse),  // Ensure warehouse is sent as an integer
        };

        console.log("Submitting stock data:", formData);

        axios({
            method,
            url,
            data: stockData,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            fetchStocks();
            resetForm();
        })
        .catch(error => console.error(`Error ${isEditing ? 'updating' : 'creating'} stock:`, error));
    };

    const handleEdit = (stock) => {
        setFormData({
            product_id: stock.product.id,
            quantity: stock.quantity,
            warehouse: stock.warehouse,
        });
        setIsEditing(true);
        setEditingStockId(stock.id);
    };

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/inventory/stock/${id}/`)
            .then(() => {
                fetchStocks();
            })
            .catch(error => {
                console.error('Error deleting stock:', error);
            });
    };

    const resetForm = () => {
        setFormData({ product_id: '', quantity: '', warehouse: '' });
        setIsEditing(false);
        setEditingStockId(null);
    };

    if (!isAuthenticated) {
        return <p>Please log in to view and manage stocks.</p>;
    }

    return (
        <div className="container">
            <h2>Stock List</h2>
            <form onSubmit={handleSubmit} className="stock-form">
                <select name="product_id" value={formData.product_id} onChange={handleChange} required>
                    <option value="">Select Product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.code}
                        </option>
                    ))}
                </select>
                <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
                <select name="warehouse" value={formData.warehouse} onChange={handleChange} required>
                    <option value="">Select Warehouse</option>
                    {warehouses.map(warehouse => (
                        <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                    ))}
                </select>
                <button type="submit">{isEditing ? 'Update' : 'Add'} Stock</button>
                {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>

            <table className="stock-table">
                <thead>
                    <tr><th>Product</th><th>Quantity</th><th>Warehouse</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {stocks.map(stock => (
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
