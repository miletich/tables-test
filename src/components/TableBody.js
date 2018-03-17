import React from 'react';
import PropTypes from 'prop-types';

import { toIsoTime } from '../helpers';

const TableBody = ({ data }) => (
  <tbody>
    {data.map(item => (
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
);

TableBody.propTypes = {
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

export default TableBody;
