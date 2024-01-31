import React, { useEffect } from 'react';

import Row from './Row';
import { NoData, Pagination } from '../../../../components';

import useListUsers from '../../../../hooks/useListUsers';

const Table = ({ setTotal }) => {
  const { listUsers, isSuccess, isLoading, totalPage, pagination } =
    useListUsers();

  useEffect(() => {
    isSuccess && setTotal(pagination.total);
  }, [pagination, isSuccess, isLoading, setTotal]);

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
          {isSuccess &&
            listUsers.map((user) => <Row key={user.id} item={user} />)}
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
