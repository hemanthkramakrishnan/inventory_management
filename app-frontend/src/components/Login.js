import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [credentials, setCredentials] = useState({username: '', password: ''});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/users/login/', credentials)
      .then(response => {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        axios.get('http://127.0.0.1:8000/api/users/me/')
          .then(userResponse => {
            setUser(userResponse.data);
            localStorage.setItem('user', JSON.stringify(userResponse.data));
            setIsLoading(false);
            navigate('/userhome');
            console.log(user)
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      })
      .catch(error => {
        alert('There was an error logging in!', error);
      });
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Login</h1>
      </header>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <div className="create-user-link">
        <p>Don't have an account?</p>
        <button onClick={() => navigate('/create-user')}>Create New User</button>
      </div>
      <footer className="footer">
        <p>&copy; 2024 User Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
