import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="w3-container overview" style={{ marginLeft: '235px' }}>
      <h4>Overview</h4>
      <div className="stats-container">
        <div className="stat">
          <h2 className="blue">51</h2>
          <small>Products</small>
        </div>
        <div className="stat">
          <h2 className="red">40</h2>
          <small>Categories</small>
        </div>
        <div className="stat">
          <h2 className="green">52</h2>
          <small>Warehouses</small>
        </div>
        <div className="stat">
          <h2 className="yellow">97</h2>
          <small>Tailors</small>
        </div>
      </div>
    </div>
  );
};

export default Home;
