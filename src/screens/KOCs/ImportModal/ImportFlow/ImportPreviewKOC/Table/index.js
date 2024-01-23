import React, { useState, useMemo } from 'react';

import Row from './Row';
import {
  NoData,
  Pagination,
  SkeletonTable,
} from '../../../../../../components';

const Table = ({ className, data, isLoading }) => {
  const [listProducts, setListProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const isSuccess = useMemo(() => {
    if (data) {
      setListProducts(data.slice((page - 1) * 5, page * 5));
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
        <div className="tableContainer w-100">
          <tr className="tableHead d-none d-lg-table-row">
            <th className="tableCell pb-3" rowSpan="2">
              Username
            </th>
            <th className="tableCell" rowSpan="2">
              Email
            </th>
            <th className="tableCell text-center" colSpan="4">
              Platform
            </th>
            <th className="tableCell" rowSpan="2">
              TikTok ID
            </th>
            <th className="tableCell" rowSpan="2">
              Instagram ID
            </th>
            <th className="tableCell" rowSpan="2">
              Hashtag
            </th>
            <th className="tableCell" rowSpan="2">
              Address
            </th>
            <th className="tableCell" rowSpan="2">
              Phone
            </th>
            <th className="tableCell" rowSpan="2">
              Category
            </th>
            <th className="tableCell" rowSpan="2">
              Tier
            </th>
            <th className="tableCell" rowSpan="2">
              Date of birth
            </th>
            <th className="tableCell" rowSpan="2"></th>
          </tr>
          <tr className="tableHead d-none d-lg-table-row">
            <th className="tableCell">TikTok</th>
            <th className="tableCell">Instagram</th>
            <th className="tableCell">Facebook</th>
            <th className="tableCell">Youtube</th>
          </tr>
          {isLoading && <SkeletonTable limit={5} colsDesktop={20} />}
          {isSuccess &&
            listProducts?.map((product, index) => {
              return <Row key={index} item={product} />;
            })}
        </div>
        {!isLoading && listProducts?.length === 0 && <NoData />}
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
