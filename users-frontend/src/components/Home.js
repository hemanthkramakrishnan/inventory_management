import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logout from './Logout';


const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      axios.get('http://127.0.0.1:8000/api/users/me/')
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  return (
    <div>
      <h1>User Management System</h1>
      <nav>
        <ul>
          <li><Link to="/staff">Staff List</Link></li>
          <li><Link to="/managers">Manager List</Link></li>
          <li><Link to="/create-user">Create New User</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        {user && (
          <div>
            <p>Welcome, {user.first_name}</p>
            <Logout />
          </div>
        )}
      </nav>
    </div>
  );
};

export default Home;