import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav
    style={{
      backgroundColor: '#333',
      minWidth: 970,
      padding: 16,
      textAlign: 'center',
    }}
  >
    {['car_purchases', 'uploads', 'users'].map(key => (
      <NavLink
        key={key}
        to={`/tables/${key}`}
        style={{
          color: '#888',
          fontSize: 18,
          margin: '0 8px',
          textDecoration: 'none',
        }}
        activeStyle={{ color: '#fff' }}
      >
        {key.replace(/([A-Z])/g, ' $1').replace('_', ' ').toUpperCase()}
      </NavLink>
    ))}
  </nav>
);

export default Navigation;
