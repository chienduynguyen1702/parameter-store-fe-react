import React, { useState, useMemo } from 'react';

import Row from './Row';
import {
  NoData,
  Pagination,
  SkeletonTable,
} from '../../../../../../../components';

const Table = ({ className, data, isLoading }) => {
  const [listContents, setListContents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const isSuccess = useMemo(() => {
    if (data) {
      setListContents(data.slice((page - 1) * 5, page * 5));
      setTotalPage(Math.ceil(data?.length / 5));
      return true;
    } else return false;
  }, [data, page]);

  const handlePageChange = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <div>
      <div className="tableOuter" style={{ minHeight: '438px' }}>
        <div className="tableContainer">
          <div className="tableHead">
            <div className="tableCell ps-3 pb-3 ">Video ID</div>
            <div className="tableCell">Products SKU</div>
            <div className="tableCell">Products Name</div>
            {/* <div className="tableCell">Product Impressions</div> */}
            {/* <div className="tableCell">Product Clicks</div> */}
            {/* <div className="tableCell">CTR</div> */}
            <div className="tableCell">Video Revenue</div>
            <div className="tableCell">Unit Sales</div>
            <div className="tableCell">Orders</div>
            <div className="tableCell">Buyers</div>
            <div className="tableCell">Est. commission</div>
            <div className="tableCell">Refunds</div>
            <div className="tableCell">Product refunds</div>
            {/* <div className="tableCell">CO rate</div> */}
            {/* <div className="tableCell">VV</div> */}
            <div className="tableCell">Error messages</div>
          </div>

          {isLoading && <SkeletonTable limit={5} colsDesktop={20} />}
          {isSuccess &&
            listContents?.map((product, index) => {
              return <Row key={index} item={product} />;
            })}
        </div>
        {!isLoading && listContents?.length === 0 && <NoData />}
      </div>

      <Pagination
        onPageChange={handlePageChange}
        forcePage={page - 1 || 0}
        pageCount={totalPage || 5}
      />
    </div>
  );
};

export default Table;
