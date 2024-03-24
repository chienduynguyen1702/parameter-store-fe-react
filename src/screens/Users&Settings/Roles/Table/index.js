import React from 'react';

import Row from './Row';
import { NoData, Pagination } from '../../../../components';

const Table = ({
  listRoles,
  isSuccess,
  isLoading,
  totalPage,
  setEditedItemId,
  archiveMutation,
}) => {
  return (
    <>
      <div className="tableOuter">
        <div className="tableContainer d-block d-sm-table">
          <div className="tableHead">
            <div className="tableCell pb-4">Name</div>
            <div className="tableCell">Assigned to</div>
            <div className="tableCell">Permissions</div>
            <div className="tableCell"></div>
          </div>
          {isSuccess &&
            listRoles.map((role) => (
              <Row
                key={role.id}
                item={role}
                setEditedItemId={setEditedItemId}
                archiveMutation={archiveMutation}
              />
            ))}
        </div>
        {isSuccess && listRoles.length === 0 && <NoData />}
      </div>
      {((isSuccess && listRoles.length !== 0) || isLoading) && (
        <Pagination pageCount={totalPage || 5} />
      )}
    </>
  );
};

export default Table;
