import React from 'react';
import PropTypes from 'prop-types';

const TableHead = ({ children }) => (
  <thead>
    <tr>{children}</tr>
  </thead>
);

TableHead.propTypes = {
  children: PropTypes.node.isRequired,
};
export default TableHead;
