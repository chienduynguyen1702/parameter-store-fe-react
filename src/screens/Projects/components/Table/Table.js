import React from 'react';

import Row from './Row/Row';
import { NoData, Pagination } from '../../../../components';

const Table = ({
  listProjects,
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
            <div className="tableCell pb-4">Project Name</div>
            <div className="tableCell">Assigned to user</div>
            <div className="tableCell"></div>
          </div>
          {isSuccess &&
            listProjects.map((item) => (
              <Row
                key={item.id}
                item={item}
                setEditedItemId={setEditedItemId}
                archiveMutation={archiveMutation}
              />
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
