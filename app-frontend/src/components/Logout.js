import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refresh_token');
    axios.post('http://127.0.0.1:8000/api/users/logout/', { refresh: refreshToken })
      .then(response => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
      })
      .catch(error => {
        console.error('There was an error logging out!', error);
      });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;