import React from 'react';

import Row from './Row/Row';
import { NoData, Pagination } from '../../../../../components';

const Table = ({
  listAgents,
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
            <div className="tableCell">Stage</div>
            <div className="tableCell">Environment</div>
            <div className="tableCell">Project</div>
            <div className="tableCell"></div>
          </div>
          {isSuccess &&
            listAgents.map((item) => (
              <Row
                key={item.id}
                item={item}
                setEditedItemId={setEditedItemId}
                archiveMutation={archiveMutation}
              />
            ))}
        </div>
        {isSuccess && listAgents.length === 0 && <NoData />}
      </div>
      {((isSuccess && listAgents.length !== 0) || isLoading) && (
        <Pagination pageCount={totalPage || 5} />
      )}
    </>
  );
};

export default Table;
