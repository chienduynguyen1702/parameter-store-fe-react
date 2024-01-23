import React, { useState, useMemo } from 'react';

import Row from './Row';
import { SkeletonTable, Pagination } from '../../../../../components';

const Table = ({ data, setErrorRowCount }) => {
  const [listUsers, setListUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const isLoading = useMemo(() => {
    if (data) {
      return false;
    } else return true;
  }, [data]);

  const isSuccess = useMemo(() => {
    if (data) {
      setListUsers(data.slice((page - 1) * 5, page * 5));
      setTotalPage(Math.ceil(data?.length / 5));
      return true;
    } else return false;
  }, [data, page]);

  const handlePageChange = (event) => {
    setPage(event.selected + 1);
  };

  const handleErrorRow = () => {
    setErrorRowCount((prevCount) => prevCount + 1); // Increment the error count
  };

  return (
    <>
      <div className="tableOuter">
        <div className="d-table w-100">
          <div className="tableHead">
            <div className="d-table-cell tableCell py-4">Date</div>
            <div className="d-table-cell tableCell">Name</div>
            <div className="d-table-cell tableCell">Category</div>
            <div className="d-table-cell tableCell">Cost</div>
            <div className="d-table-cell tableCell">P.I.C</div>
            <div className="d-table-cell tableCell">Status</div>
            <div className="d-table-cell tableCell">Evidence</div>
          </div>
          {isLoading && <SkeletonTable colsDesktop={6} limit={5} />}
          {isSuccess &&
            listUsers?.map((user, index) => (
              <Row
                key={`import-pampering-${index}`}
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
