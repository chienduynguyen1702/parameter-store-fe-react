import React, { useEffect } from 'react';

import Row from './Row';
import { NoData, Pagination } from '../../../components';

import { useListSecrets } from '../../../hooks/Data';
const Table = ({ setTotal }) => {
  const { listSecrets, isSuccess, isLoading, totalPage, pagination } =
    useListSecrets();

  useEffect(() => {
    isSuccess && setTotal(pagination.total);
  }, [pagination, isSuccess, isLoading, setTotal]);

  return (
    <>
      <div className="tableOuter">
        <div className="tableContainer">
          <div className="tableHead">
            <div className="tableCell pb-4">ID</div>
            <div className="tableCell">Name</div>
            <div className="tableCell">Value</div>
            <div className="tableCell">Project Name</div>
            <div className="tableCell">Description</div>
            <div className="tableCell">Created At</div>
            <div className="tableCell">Updated At</div>
            <div className="tableCell"></div>
          </div>
          {isSuccess &&
            listSecrets.map((secrets) => (
              <Row key={secrets.id} item={secrets} />
            ))}
        </div>
        {isSuccess && listSecrets.length === 0 && <NoData />}
      </div>
      {((isSuccess && listSecrets.length !== 0) || isLoading) && (
        <Pagination pageCount={totalPage || 5} />
      )}
    </>
  );
};

export default Table;
