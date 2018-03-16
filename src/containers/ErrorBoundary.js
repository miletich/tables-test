import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UiMessage from '../components/UiMessage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });

    // should be sent to an error reporting service instead
    console.error(error, info); // eslint-disable-line no-console
  }

  render() {
    return this.state.hasError
      ? <UiMessage>Something went wrong</UiMessage>
      : this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
