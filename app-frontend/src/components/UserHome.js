import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logout from './Logout';
import './UserHome.css';


const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => { // Create an async function
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          const response = await axios.get('http://127.0.0.1:8000/api/users/me/'); // Await the response
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData(); // Call the async function
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>User Management System</h1>
      </header>
      <nav className="nav">
        <ul>
          <li><Link to="/staff">Staff List</Link></li>
          <li><Link to="/managers">Manager List</Link></li>
          <li><Link to="/create-user">Create New User</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/warehouses">Warehouse List</Link></li>
          <li><Link to="/stocks">Stock List</Link></li>
        </ul>
      </nav>
      {user && (
        <div>
          <p>Welcome, {user.first_name}</p>
          <Logout />
        </div>
      )}
      <div className="cards">
        <div className="card">
          <h3>Staff Management</h3>
          <p>Manage your staff efficiently by creating, updating, and monitoring user details.</p>
        </div>
        <div className="card">
          <h3>Manager Management</h3>
          <p>Track and manage manager roles and responsibilities within the system.</p>
        </div>
        <div className="card">
          <h3>User Creation</h3>
          <p>Create new users with appropriate roles to maintain an organized workflow.</p>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 User Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;