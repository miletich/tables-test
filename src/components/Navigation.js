import React from 'react';
import { NavLink } from 'react-router-dom';

import data from '../data/';

const Navigation = () => (
  <nav style={{ backgroundColor: '#333', padding: 16, textAlign: 'center' }}>
    {Object.keys(data).map(key => (
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
        {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
      </NavLink>
    ))}
  </nav>
);

export default Navigation;
