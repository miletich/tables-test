import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

import TableHeading from './TableHeading';

const sortByKey = key => (a, b) => {
  if (typeof a[key] === 'string') {
    return a[key].localeCompare(b[key]);
  } else if (typeof a[key] === 'object') {
    return (
      moment(`${b[key].date} ${b[key].time}`).valueOf() -
      moment(`${a[key].date} ${a[key].time}`).valueOf()
    );
  }
  return a[key] - b[key];
};

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.data, sortBy: null, sortedData: this.props.data };
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }

  handleTitleClick(sorter) {
    const { data, sortBy } = this.state;
    this.setState({
      sortBy: sortBy === sorter ? null : sorter,
      sortedData: sortBy === sorter ? data : [...data].sort(sortByKey(sorter)),
    });
  }

  render() {
    const { data, sortedData } = this.state;
    return (
      <table className="table">
        <thead>
          <tr>
            <TableHeading
              firstRow={Object.entries(data[0])}
              onHandleTitleClick={this.handleTitleClick}
            />
          </tr>
        </thead>
        <tbody>
          {sortedData.map(item => (
            <tr key={item.id}>
              {Object.values(item).map((value) => {
                if (typeof value === 'object') {
                  return (
                    <td key={value}>
                      <Moment fromNow>{`${value.date} ${value.time}`}</Moment>
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
