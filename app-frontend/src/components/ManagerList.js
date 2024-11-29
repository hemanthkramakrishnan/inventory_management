import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManagerList = () => {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const fetchManager = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/users/');
        const managers = response.data.filter(user => user.role === 'manager' || user.is_manager);
        setManagers(managers);
      } catch (error) {
        console.error('Error fetching Managers:', error);
      }
    };

    fetchManager();
  }, []);

  return (
    <div>
      <h2>Manager List</h2>
      <ul>
        {managers.map(manager => (
          <li key={manager.id}>{manager.username} - {manager.first_name} {manager.last_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerList;