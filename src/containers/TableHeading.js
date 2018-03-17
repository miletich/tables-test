import React from 'react';
import PropTypes from 'prop-types';

import { formatTitle, shouldRightAlign } from '../helpers';

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
    return firstRow.map(([key, value]) => (
      <th
        key={key}
        scope="cell"
        className={shouldRightAlign(value) ? 'text-right' : ''}
        data-filter={key}
        onClick={this.sortValues}
      >
        {formatTitle(key)}
      </th>
    ));
  }
}

TableHeading.propTypes = {
  firstRow: PropTypes.arrayOf(PropTypes.array).isRequired,
  onHandleTitleClick: PropTypes.func.isRequired,
};

export default TableHeading;
