import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserHome from './UserHome';
import StaffList from './StaffList';
import ManagerList from './ManagerList';
import CreateUser from './CreateUser';
import Login from './Login';

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
      </Routes>
    </Router>
  );
};

export default AppRouter;