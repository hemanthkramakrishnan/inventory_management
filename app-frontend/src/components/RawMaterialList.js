import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RawMaterialList.css';

const RawMaterialList = () => {
  const [rawMaterials, setRawMaterials] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/inventory/raw_materials/')
      .then(response => {
        setRawMaterials(response.data);
      })
      .catch(error => {
        console.error('Error fetching raw materials:', error);
      });
  }, []);

  return (
    <div className="container">
      <h2>Raw Material List</h2>
      {rawMaterials.map(rawMaterial => (
        <div key={rawMaterial.id} className="raw-material-card">
          <h3>{rawMaterial.name}</h3>
          <p>Width: {rawMaterial.width} m</p>
          <p>Length: {rawMaterial.length} m</p>
          <p>Remaining Quantity: {rawMaterial.remaining_quantity} m</p>
          <p>Category: {rawMaterial.category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default RawMaterialList;