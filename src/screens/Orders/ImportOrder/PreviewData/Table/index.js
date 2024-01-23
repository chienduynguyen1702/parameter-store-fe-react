import React from 'react';

import cn from 'classnames';
import styles from './Table.module.sass';

import Row from './Row';

const Table = ({ data }) => {
  return (
    <div className={cn('tableOuter', styles.table)}>
      <div className="tableContainer">
        <div className="tableHead">
          <div className="d-table-cell ps-3 pb-3 pe-4">Name</div>
          <div className="d-table-cell pe-4">Delivery Code</div>
          <div className="d-table-cell pe-4">Address</div>
          <div className="d-table-cell pe-4">Amount</div>
          <div className="d-table-cell pe-4">Price</div>
          <div className="d-table-cell pe-4">KOC</div>
          <div className="d-table-cell pe-4">Type</div>
          <div className="d-table-cell pe-4">Platform</div>
        </div>
        {data && data.map((order, index) => <Row key={index} item={order} />)}
      </div>
    </div>
  );
};

export default Table;
