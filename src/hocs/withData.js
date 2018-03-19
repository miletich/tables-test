import React from 'react';
import UiMessage from '../components/UiMessage';

const withData = ({ table }) => (Component) => {
  class WithData extends Component {
    constructor(props) {
      super(props);
      try {
        const data = require(`../data/${table}.json`); // eslint-disable-line
        this.state = { data };
      } catch (e) {
        this.state = { error: true };
      }
    }

    render() {
      const { data, error } = this.state;
      return error ? <UiMessage>404: Not found</UiMessage> : <Component name={table} data={data} />;
    }
  }

  return <WithData />;
};

export default withData;
