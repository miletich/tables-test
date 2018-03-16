import React, { Component } from 'react';
import PropTypes from 'prop-types';
import removeAccents from 'remove-accents';

import { formatTitle, toIsoTime, getUniqueVals } from '../helpers';
import TableHeading from './TableHeading';

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

    // usually, i'd make these helpers general-purpose and extract them in a separate module
    const sortByKey = key => (a, b) => {
      if (typeof a[key] === 'string') {
        return a[key].localeCompare(b[key]);
      } else if (typeof a[key] === 'object') {
        return toIsoTime(b[key]).diff(toIsoTime(a[key]));
      }
      return a[key] - b[key];
    };
    const processString = str => removeAccents(str).toLowerCase();
    const contains = (key, value) => obj => processString(obj[key]).includes(processString(value));
    const isEqual = (key, value) => obj => obj[key] === value;
    const isInTimeRange = (key, value) => obj => toIsoTime(obj[key]).fromNow().includes(value);
    // enables applying all active filters without requiring multiple array iterations
    const composePredicates = predicates => predicates.reduce((acc, cur) => x => acc(x) && cur(x));
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
    this.setState({
      sortBy,
    });
  }

  render() {
    const { data, processedData } = this.state;
    return (
      <div style={{ minWidth: 970 }}>
        <div className="mt-5 mb-5 mx-auto">
          <h2 className="h2 text-center mb-3">Filter table</h2>
          <form className="form-inline text-center">
            <div className="form-row mx-auto">
              {Object.entries(data[0]).map(([key]) => {
                if (key !== 'id') {
                  if (key === 'payment_method') {
                    return (
                      <div key={key} className="col">
                        <select
                          id={key}
                          className="form-control"
                          data-filter={key}
                          onChange={this.handleChange}
                        >
                          <option value="">Any payment method</option>
                          {getUniqueVals(data.map(obj => obj.payment_method))
                            .sort()
                            .map(method => (
                              <option key={method} value={method}>
                                {method}
                              </option>
                            ))}
                        </select>
                      </div>
                    );
                  } else if (key === 'datetime') {
                    return (
                      <div key={key} className="col">
                        <select
                          id={key}
                          className="form-control"
                          data-filter={key}
                          onChange={this.handleChange}
                        >
                          <option value="">Any time</option>
                          {getUniqueVals(data
                              .map(obj => toIsoTime(obj.datetime))
                              .sort((a, b) => b.diff(a))
                              .map(time => time.fromNow())).map(time => (
                                <option key={time} value={time}>
                                  {time}
                                </option>
                          ))}
                        </select>
                      </div>
                    );
                  }
                  return (
                    <div key={key} className="col">
                      <input
                        type="text"
                        className="form-control"
                        id={key}
                        placeholder={formatTitle(key)}
                        onChange={this.handleChange}
                        data-filter={key}
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </form>
        </div>
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
            {processedData.map(item => (
              <tr key={item.id}>
                {Object.values(item).map((value) => {
                  if (typeof value === 'object') {
                    return <td key={value}>{toIsoTime(value).fromNow()}</td>;
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
      </div>
    );
  }
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
