import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffList = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/users/users/?role=staff')
      .then(response => {
        setStaff(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the staff!', error);
      });
  }, []);

  return (
    <div>
      <h2>Staff List</h2>
      <ul>
        {staff.map(staffMember => (
          <li key={staffMember.id}>{staffMember.username} - {staffMember.first_name} {staffMember.last_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StaffList;