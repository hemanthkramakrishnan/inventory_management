import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManagerList = () => {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/users/users/?role=manager')
      .then(response => {
        setManagers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the managers!', error);
      });
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