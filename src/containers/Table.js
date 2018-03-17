import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { sortByKey, composePredicates, isEqual, isInTimeRange, contains } from '../helpers';
import TableFilters from '../components/TableFilters';
import TableHead from '../components/TableHead';
import TableHeading from './TableHeading';
import TableBody from '../components/TableBody';
import UiMessage from '../components/UiMessage';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      sortBy: null,
      filters: {},
      processedData: this.props.data,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy, filters, data } = this.state;

    const haveFiltersChanged = () => {
      // helps avoid more expensive computation below when possible
      if (Object.keys(prevState.filters).length !== Object.keys(filters).length) {
        return true;
      }
      return Object.keys(filters)
        .map(key => prevState.filters[key] !== filters[key])
        .includes(true);
    };

    const filterData = () =>
      data.filter(composePredicates(Object.entries(filters).map(([key, value]) => {
        if (key === 'payment_method' && value) {
          return isEqual(key, value);
        } else if (key === 'datetime') {
          return isInTimeRange(key, value);
        }
        return contains(key, value);
      })));
    // as soon as react 16.3 is out, it will start printing deprecation warnings for all `will`
    // lifecycle methods, making this particular rule obsolete
    /* eslint-disable react/no-did-update-set-state */
    if (haveFiltersChanged()) {
      this.setState({
        processedData: sortBy ? [...filterData()].sort(sortByKey(sortBy)) : filterData(),
      });
    }
    if (sortBy && sortBy !== prevState.sortBy) {
      this.setState({
        processedData: Object.keys(filters).length
          ? [...filterData()].sort(sortByKey(sortBy))
          : [...data].sort(sortByKey(sortBy)),
      });
    }
    /* eslint-enable */
  }

  handleChange(e) {
    const { value, dataset: { filter } } = e.target;
    this.setState({
      filters: Object.assign({}, this.state.filters, { [filter]: value }),
    });
  }

  handleTitleClick(sortBy) {
    this.setState({ sortBy });
  }

  render() {
    const { data, processedData } = this.state;
    return (
      <div style={{ minWidth: 970 }}>
        <TableFilters data={data} onHandleChange={this.handleChange} />
        {processedData.length ? (
          <table className="table">
            <TableHead>
              <TableHeading
                firstRow={Object.entries(data[0])}
                onHandleTitleClick={this.handleTitleClick}
              />
            </TableHead>
            <TableBody data={processedData} />
          </table>
        ) : (
          <UiMessage>No results</UiMessage>
        )}
      </div>
    );
  }
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
