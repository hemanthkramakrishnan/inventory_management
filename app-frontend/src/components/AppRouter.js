import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserHome from './UserHome';
import StaffList from './StaffList';
import ManagerList from './ManagerList';
import CreateUser from './CreateUser';
import Login from './Login';
import WarehouseList from './WarehouseList';
import StockList from './StockList';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import RawMaterialList from './RawMaterialList';
import WarehouseStock from './WarehouseStock';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/staff" element={<StaffList />} />
        <Route path="/managers" element={<ManagerList />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/warehouses" element={<WarehouseList />} />
        <Route path="/stocks" element={<StockList />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/rawmaterials" element={<RawMaterialList />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;