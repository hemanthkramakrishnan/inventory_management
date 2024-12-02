import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    role: 'staff', // Can be either 'staff' or 'manager'
    profile_picture: null // Add profile picture field
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_picture: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== '') {
        data.append(key, formData[key]);
      }
    }
    axios.post('http://127.0.0.1:8000/api/users/users/',
        data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
       .then(response => {
         alert('User created successfully');
         navigate('/login');
       })
       .catch(error => {
         console.error('There was an error creating the user!', error);
       });
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required /><br></br>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br></br>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /><br></br>
        <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} /><br></br>
        <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} /><br></br>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="" disabled>Select role</option>
          <option value="staff">Staff</option>
          <option value="manager">Manager</option>
        </select><br></br>
        <input type="file" name="profile_picture" onChange={(e) => {handleFileChange(e)}}/><br></br>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;