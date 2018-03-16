import React from 'react';
import PropTypes from 'prop-types';

const UiMessage = ({ children }) => (
  <h4 className="w-100 text-center mt-5 h4">{children}</h4>
);

UiMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UiMessage;
