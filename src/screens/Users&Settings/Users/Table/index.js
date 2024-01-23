import React, { useEffect } from 'react';

import Row from './Row';
import SkeletonTable from '../../../../components/SkeletonTable';
import { NoData, Pagination } from '../../../../components';

import useListUsers from '../../../../hooks/Data/useListUsers';
import useListRoles from '../../../../hooks/Suggestion/useListRoles';

const Table = ({ setTotalUsers }) => {
  const {
    listUsers,
    isSuccess,
    isLoading,
    limit,
    totalPage,
    pagination,
    handleUpdateUserRole,
    archiveUserMutation,
  } = useListUsers();

  const { listRoles } = useListRoles();

  useEffect(() => {
    isSuccess && setTotalUsers(pagination.total);
  }, [pagination, isSuccess, isLoading, setTotalUsers]);

  return (
    <>
      <div className="tableOuter">
        <div className="tableContainer">
          <div className="tableHead">
            <div className="tableCell pb-4">User</div>
            <div className="tableCell">Email</div>
            <div className="tableCell">Permissions</div>
            <div className="tableCell">Role</div>
            <div className="tableCell">Last sign in</div>
            <div className="tableCell"></div>
          </div>
          {isLoading && (
            <SkeletonTable
              avatar
              threeDotsCols
              colsDesktop={4}
              rowsMobile={4}
              limit={limit}
            />
          )}
          {isSuccess &&
            listUsers.map((user) => (
              <Row
                key={user.id}
                item={user}
                listRoles={listRoles.data}
                handleUpdateUserRole={handleUpdateUserRole}
                archiveUserMutation={archiveUserMutation}
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
