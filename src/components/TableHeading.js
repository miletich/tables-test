import React from 'react';
import PropTypes from 'prop-types';

import { formatTitle } from '../helpers';

class TableHeading extends React.PureComponent {
  constructor() {
    super();
    this.sortValues = this.sortValues.bind(this);
  }

  sortValues(e) {
    e.preventDefault();
    this.props.onHandleTitleClick(e.target.dataset.filter);
  }

  render() {
    const { firstRow } = this.props;
    return firstRow.map(([key, value]) => {
      if (typeof value === 'number' || (typeof value === 'string' && value.includes('$'))) {
        return (
          <th
            key={key}
            scope="cell"
            style={{ textAlign: 'right' }}
            data-filter={key}
            onClick={this.sortValues}
          >
            {formatTitle(key)}
          </th>
        );
      }
      return (
        <th key={key} scope="cell" data-filter={key} onClick={this.sortValues}>
          {formatTitle(key)}
        </th>
      );
    });
  }
}

TableHeading.propTypes = {
  firstRow: PropTypes.arrayOf(PropTypes.array).isRequired,
  onHandleTitleClick: PropTypes.func.isRequired,
};

export default TableHeading;
