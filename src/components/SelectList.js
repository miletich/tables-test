import React from 'react';
import PropTypes from 'prop-types';

const SelectList = ({ children, name, onHandleChange }) => (
  <div className="col">
    <select id={name} className="form-control" data-filter={name} onChange={onHandleChange}>
      <option value="">Any {name.replace('_', ' ')}</option>
      {children}
    </select>
  </div>
);

SelectList.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired,
};

export default SelectList;
