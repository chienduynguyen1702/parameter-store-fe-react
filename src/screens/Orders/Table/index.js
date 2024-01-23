import React from 'react';

import Row from './Row';
import SkeletonTable from './Skeleton';
import { NoData, Pagination } from '../../../components';

const Table = ({
  listOrders,
  isSuccess,
  isLoading,
  totalPage,
  archiveOrderMutation,
}) => {
  return (
    <>
      <div className="tableOuter">
        <div className="tableContainer">
          <div className="tableHead">
            <div className="d-table-cell tableCell ps-3 pb-3 pe-4">Name</div>
            <div className="d-table-cell tableCell pe-4">Delivery Code</div>
            <div className="d-table-cell tableCell pe-4">Address</div>
            <div className="d-table-cell tableCell pe-4">Amount</div>
            <div className="d-table-cell tableCell pe-4">Price</div>
            <div className="d-table-cell tableCell pe-4">KOC</div>
            <div className="d-table-cell tableCell pe-4">Type</div>
            <div className="d-table-cell tableCell pe-4">Platform</div>
            <div className="d-table-cell tableCell pe-3"></div>
          </div>
          {isLoading && <SkeletonTable limit={10} />}
          {isSuccess &&
            listOrders.map((order) => (
              <Row
                key={order.id}
                item={order}
                archiveOrderMutation={archiveOrderMutation}
              />
            ))}
        </div>
        {isSuccess && listOrders.length === 0 && <NoData />}
      </div>
      <Pagination pageCount={totalPage || 5} />
    </>
  );
};

export default Table;
