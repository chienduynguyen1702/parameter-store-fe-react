import React, { useEffect, useState } from 'react';

import Row from './Row';
import SkeletonTable from './Skeleton';

import { useListProducts } from '../../../hooks/Data';
import { NoData, Pagination } from '../../../components';

import cn from 'classnames';
import styles from './Table.module.sass';

const Table = ({ setCountProducts, setVisibleProductView }) => {
  const [activeId, setActiveId] = useState(1);

  const { listProducts, isSuccess, isLoading, pagination, limit, totalPage } =
    useListProducts();
  useEffect(() => {
    if (isSuccess) setCountProducts(pagination.total);
  }, [isSuccess, pagination, setCountProducts]);

  return (
    <>
      <div className="tableOuter">
        <div className="tableContainer w-100">
          <div className="tableHead d-none d-lg-table-row">
            <div className={cn('d-table-cell tableCell')}>Name</div>
            <div className="d-table-cell tableCell pb-3">SKU Code</div>
            {/* <div className="d-table-cell tableCell">Platform</div> */}
            {/* <div className="d-table-cell tableCell">Category</div> */}
            {/* <div className="d-table-cell tableCell ">Type</div> */}
            {/* <div className="d-table-cell tableCell">Full Price</div> */}
            {/* <div className="d-table-cell tableCell">Current Price</div> */}
            {/* <div className="d-table-cell tableCell">Discounted Rate</div> */}
            {/* <div className="d-table-cell tableCell"></div> */}
          </div>
          {isLoading && <SkeletonTable limit={limit} />}
          {isSuccess &&
            listProducts.map((product) => (
              <Row
                key={product.id}
                item={product}
                activeId={activeId}
                setActiveId={setActiveId}
                setVisibleProductView={setVisibleProductView}
              />
            ))}
        </div>
        {isSuccess && listProducts.length === 0 && <NoData />}
      </div>
      <Pagination pageCount={totalPage || 5} />
    </>
  );
};

export default Table;
