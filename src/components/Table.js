import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const formatTitle = string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`.replace('_', ' ');

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.data };
  }
  render() {
    const { data } = this.state;
    return (
      <table className="table">
        <thead>
          <tr>
            {Object.entries(data[0]).map(([key, value]) => {
              if (typeof value === 'number' || (typeof value === 'string' && value.includes('$'))) {
                return (
                  <th key={key} scope="cell" style={{ textAlign: 'right' }}>
                    {formatTitle(key)}
                  </th>
                );
              }
              return (
                <th key={key} scope="cell">
                  {formatTitle(key)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              {Object.values(item).map((value) => {
                if (typeof value === 'object') {
                  return (
                    <td key={value}>
                      <Moment fromNow>{value}</Moment>
                    </td>
                  );
                } else if (typeof value === 'string') {
                  if (value.includes('@')) {
                    return (
                      <td key={value}>
                        <a href={`mailto:${value}`}>{value}</a>
                      </td>
                    );
                  } else if (value.includes('$')) {
                    return (
                      <td key={value} style={{ textAlign: 'right' }}>
                        {value}
                      </td>
                    );
                  }
                  return <td key={value}>{value}</td>;
                }
                return (
                  <td key={value} style={{ textAlign: 'right' }}>
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
