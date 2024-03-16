import React from 'react';

import Row from './Row';
import { NoData, Pagination } from '../../../../components';

import { useListUsers } from '../../../../hooks/data';

const Table = ({ setEditedItemId, archiveMutation }) => {
  const { listUsers, isSuccess, isLoading, totalPage } = useListUsers();

  return (
    <>
      <div className="tableOuter">
        <div className="tableContainer">
          <div className="tableHead">
            <div className="tableCell pb-4">Name</div>
            <div className="tableCell">Project</div>
            <div className="tableCell">Permissions</div>
            <div className="tableCell">Role</div>
            <div className="tableCell">Last sign in</div>
            <div className="tableCell"></div>
          </div>
          {isSuccess &&
            listUsers.map((user) => (
              <Row
                key={user.id}
                item={user}
                setEditedItemId={setEditedItemId}
                archiveMutation={archiveMutation}
              />
            ))}
        </div>
        {isSuccess && listUsers.length === 0 && <NoData />}
      </div>
      {((isSuccess && listUsers.length !== 0) || isLoading) && (
        <Pagination pageCount={totalPage || 5} />
      )}
    </>
  );
};

export default Table;
