import React, { useEffect } from 'react';

import Row from './Row';
import { NoData, Pagination } from '../../../components';

import { useListProjects } from '../../../hooks';
const Table = ({ setTotal }) => {
  const { listProjects, isSuccess, isLoading, totalPage, pagination } =
    useListProjects();

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
            <div className="tableCell">Description</div>
            <div className="tableCell">Created At</div>
            <div className="tableCell">Updated At</div>
            <div className="tableCell"></div>
          </div>
          {isSuccess &&
            listProjects.map((projects) => (
              <Row key={projects.id} item={projects} />
            ))}
        </div>
        {isSuccess && listProjects.length === 0 && <NoData />}
      </div>
      {((isSuccess && listProjects.length !== 0) || isLoading) && (
        <Pagination pageCount={totalPage || 5} />
      )}
    </>
  );
};

export default Table;
