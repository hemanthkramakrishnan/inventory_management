import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffList = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/users/');
        const staffMembers = response.data.filter(user => user.role === 'staff' || user.is_staff_user);
        setStaff(staffMembers);
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };

    fetchStaff();
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