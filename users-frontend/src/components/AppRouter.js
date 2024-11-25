import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import StaffList from './StaffList';
import ManagerList from './ManagerList';
import CreateUser from './CreateUser';
import Login from './Login';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/staff" element={<StaffList />} />
        <Route path="/managers" element={<ManagerList />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;