import React from 'react';
import Row from './Row';
import SkeletonTable from './Skeleton';

import { NoData, Pagination } from '../../../../components';
import useProductsByIdOrder from './useProductsByIdOrder';

const Table = ({ setTotal }) => {
  const { listProducts, isSuccess, isLoading, limit, totalPage } =
    useProductsByIdOrder();
  if (isSuccess) {
    setTotal(listProducts.length);
  }

  return (
    <>
      <div className="tableOuter">
        <div className="tableContainer w-100">
          <div className="tableHead">
            <div className="d-table-cell ps-3 pb-3 pe-4">Product</div>
            <div className="d-table-cell pe-4">Amount</div>
            <div className="d-table-cell pe-4">Product Code</div>
            <div className="d-table-cell pe-4">Category</div>
            <div className="d-table-cell pe-4">Type</div>
            <div className="d-table-cell pe-4">Price</div>
          </div>
          {isLoading && <SkeletonTable limit={limit} />}
          {isSuccess &&
            listProducts.map((product) => (
              <Row key={product.id} item={product} />
            ))}
        </div>
        {isSuccess && listProducts.length === 0 && <NoData />}
      </div>
      <Pagination pageCount={totalPage || 5} />
    </>
  );
};
export default Table;
