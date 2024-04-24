import React from 'react';

import Row from './Row/Row';
import { NoData, Pagination } from '../../../../../../components';

const Table = ({
  listEnvironments,
  isSuccess,
  isLoading,
  totalPage,
  setEditedItemId,
  archiveMutation,
}) => {
  return (
    <>
      <div className="tableOuter">
        <div className="tableContainer">
          <div className="tableHead">
            <div className="tableCell pb-4">Name</div>
            <div className="tableCell">Description</div>
            <div className="tableCell"></div>
          </div>
          {isSuccess &&
            listEnvironments.map((agent) => (
              <Row
                key={agent.id}
                item={agent}
                setEditedItemId={setEditedItemId}
                archiveMutation={archiveMutation}
              />
            ))}
        </div>
        {isSuccess && listEnvironments.length === 0 && <NoData />}
      </div>
      {((isSuccess && listEnvironments.length !== 0) || isLoading) && (
        <Pagination pageCount={totalPage || 5} />
      )}
    </>
  );
};

export default Table;
