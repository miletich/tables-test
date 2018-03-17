import React from 'react';
import PropTypes from 'prop-types';

import { formatTitle, toIsoTime, getUniqueVals } from '../helpers';

const TableFilters = ({ data, onHandleChange }) => (
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
                    onChange={onHandleChange}
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
                    onChange={onHandleChange}
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
                  onChange={onHandleChange}
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
);

TableFilters.propTypes = {
  onHandleChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      filename: PropTypes.string.isRequired,
      datetime: PropTypes.shape({
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
      }).isRequired,
    }),
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      car: PropTypes.string.isRequired,
      payment_method: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
    }),
  ]).isRequired).isRequired,
};

export default TableFilters;
