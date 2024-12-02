import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logout from './Logout';
import './UserHome.css';


const Home = () => {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile && user) {
      const formData = new FormData();
      formData.append('profile_picture', selectedFile);
      try {
        const accessToken = localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        await axios.patch(`http://127.0.0.1:8000/api/users/${user.id}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // Refresh user data after upload
        const response = await axios.get('http://127.0.0.1:8000/api/users/me/');
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

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
          <img
            src={`http://127.0.0.1:8000/static${user.profile_picture || 'profile_pics/default_user.png'}`}
            height="100px"
            width="100px"
            alt="Profile"
            className="profile-picture"
          />
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