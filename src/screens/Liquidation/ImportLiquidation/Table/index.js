import React, { useState, useMemo } from 'react';

import Row from './Row';
import SkeletonTable from '../../../../components/SkeletonTable';
import { Pagination } from '../../../../components';

const Table = ({ data, setErrorRowCount }) => {
  const [listLiquidations, setListLiquidations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const isLoading = useMemo(() => {
    if (data) {
      return false;
    } else return true;
  }, [data]);

  const isSuccess = useMemo(() => {
    if (data) {
      setListLiquidations(data.slice((page - 1) * 5, page * 5));
      setTotalPage(Math.ceil(data?.length / 5));
      return true;
    } else return false;
  }, [data, page]);

  const handlePageChange = (event) => {
    setPage(event.selected + 1);
  };

  // Increment the error count
  const handleErrorRow = () => {
    setErrorRowCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <div lassName="tableOuter">
        <div className="d-table w-100">
          <div className="tableHead">
            {/* <div className="d-sm-table-row tableHead d-none"> */}
            <div className="d-table-cell tableCell pb-4 pt-4">Name</div>
            <div className="d-table-cell tableCell">From</div>
            <div className="d-table-cell tableCell">To</div>
            <div className="d-table-cell tableCell">Category</div>
            <div className="d-table-cell tableCell">Receiver</div>
            <div className="d-table-cell tableCell">Status</div>
            <div className="d-table-cell tableCell">Total Cost</div>
            <div className="d-table-cell tableCell">P.I.C</div>
          </div>
          {isLoading && <SkeletonTable colsDesktop={5} limit={5} />}
          {isSuccess &&
            listLiquidations?.map((user, index) => (
              <Row
                key={`import-koc-${index}`}
                item={user}
                setRowIsError={() => handleErrorRow(user)}
              />
            ))}
        </div>
      </div>
      <Pagination
        onPageChange={handlePageChange}
        pageCount={totalPage || 5}
        forcePage={page - 1 || 0}
      />
    </>
  );
};

export default Table;
