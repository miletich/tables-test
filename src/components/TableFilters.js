import React from 'react';
import PropTypes from 'prop-types';

import { formatTitle, toIsoTime, getUniqueVals, dataPropType } from '../helpers';
import SelectList from './SelectList';

const TableFilters = ({ data, onHandleChange, name }) => (
  <div className="mt-5 mb-5 mx-auto">
    <h2 className="h2 text-center mb-3">{`Filter ${name
      .replace(/([A-Z])/, ' $1')
      .toLowerCase()} table`}
    </h2>
    <form className="form-inline text-center">
      <div className="form-row mx-auto">
        {Object.entries(data[0]).map(([key]) => {
          if (key !== 'id') {
            if (key === 'payment_method') {
              return (
                <SelectList key={key} name={key} onHandleChange={onHandleChange}>
                  {getUniqueVals(data.map(({ payment_method }) => payment_method))
                    .sort()
                    .map(method => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                </SelectList>
              );
            } else if (key === 'datetime') {
              return (
                <SelectList key={key} name={key} onHandleChange={onHandleChange}>
                  {getUniqueVals(data
                      .map(({ datetime }) => toIsoTime(datetime))
                      .sort((a, b) => b.diff(a))
                      .map(time => time.fromNow())).map(time => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                  ))}
                </SelectList>
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
  data: dataPropType.isRequired,
  name: PropTypes.string.isRequired,
};

export default TableFilters;
