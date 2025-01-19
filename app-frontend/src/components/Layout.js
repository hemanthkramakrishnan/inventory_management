import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { UserContext } from '../UserContext';
import './Layout.css';

const Layout = ({ children }) => {
    const { user } = useContext(UserContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Fetch user logic...
      setLoading(false);
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="layout">
          <header className="header">
            <div className="header-left">
              <h1>User Management System</h1>
            </div>
            <div className="header-right">
              {user ? (
                <div className="user-info">
                  <img
                    src={`http://127.0.0.1:8000/static${user.profile_picture || '/profile_pics/default_user.png'}`}
                    alt="Profile"
                    className="profile-picture"
                    height="40"
                    width="40"
                  />
                  <span>{user.first_name}</span>
                  <Logout />
                </div>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
          </header>
          <nav className="nav">
            <ul>
              <li><Link to="/staff">Staff List</Link></li>
              <li><Link to="/managers">Manager List</Link></li>
              <li><Link to="/categories">Category List</Link></li>
              <li><Link to="/products">Product List</Link></li>
              <li><Link to="/warehouses">Warehouse List</Link></li>
              <li><Link to="/stocks">Stock List</Link></li>
            </ul>
          </nav>
          <main className="content">{children}</main>
          <footer className="footer">
            <p>&copy; 2025 User Management System. All rights reserved.</p>
          </footer>
        </div>
    );
};

export default Layout;
