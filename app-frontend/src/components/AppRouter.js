import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout'; // Import the Layout component
import Home from './Home';
import StaffList from './StaffList';
import ManagerList from './ManagerList';
import CreateUser from './CreateUser';
import Login from './Login';
import WarehouseList from './WarehouseList';
import StockList from './StockList';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import RawMaterialList from './RawMaterialList';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Routes */}
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/create-user" element={<Layout><CreateUser /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/staff" element={<Layout><StaffList /></Layout>} />
        <Route path="/managers" element={<Layout><ManagerList /></Layout>} />
        <Route path="/warehouses" element={<Layout><WarehouseList /></Layout>} />
        <Route path="/stocks" element={<Layout><StockList /></Layout>} />
        <Route path="/categories" element={<Layout><CategoryList /></Layout>} />
        <Route path="/products" element={<Layout><ProductList /></Layout>} />
        <Route path="/raw-materials" element={<Layout><RawMaterialList /></Layout>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;