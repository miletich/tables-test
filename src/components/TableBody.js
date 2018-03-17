import React from 'react';

import { toIsoTime, shouldRightAlign, dataPropType } from '../helpers';

const TableBody = ({ data }) => (
  <tbody>
    {data.map(item => (
      <tr key={item.id}>
        {Object.values(item).map((value) => {
          if (typeof value === 'object') {
            return <td key={value}>{toIsoTime(value).fromNow()}</td>;
          }
          return (
            <td key={value} style={shouldRightAlign(value) ? { textAlign: 'right' } : {}}>
              {typeof value === 'string' && value.includes('@') ? (
                <a href={`mailto:${value}`}>{value}</a>
              ) : (
                value
              )}
            </td>
          );
        })}
      </tr>
    ))}
  </tbody>
);

TableBody.propTypes = {
  data: dataPropType.isRequired,
};

export default TableBody;
