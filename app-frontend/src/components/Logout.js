import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext'; // Adjust the import path if needed

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Access setUser from UserContext

  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refresh_token');
    axios
      .post('http://127.0.0.1:8000/api/users/logout/', { refresh: refreshToken })
      .then(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null); // Clear the user context
        navigate('/login'); // Redirect to login
      })
      .catch(error => {
        console.error('There was an error logging out!', error);
      });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
