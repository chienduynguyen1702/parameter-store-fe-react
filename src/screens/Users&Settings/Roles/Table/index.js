import React, { useEffect } from 'react';

import Row from './Row';
import { NoData, Pagination, SkeletonTable } from '../../../../components';

import useListRoles from '../../../../hooks/Data/useListRoles';

const Table = ({ setTotalRoles }) => {
  const {
    listRoles,
    isSuccess,
    isLoading,
    limit,
    totalPage,
    archiveRoleMutation,
    pagination,
  } = useListRoles();

  useEffect(() => {
    isSuccess && setTotalRoles(pagination.total);
  }, [pagination, isSuccess, isLoading, setTotalRoles]);

  return (
    <>
      <div className="tableOuter">
        <div className="tableContainer d-block d-sm-table">
          <div className="tableHead">
            <div className="tableCell pb-4">Role</div>
            <div className="tableCell">Assigned to</div>
            <div className="tableCell">Permissions</div>
            <div className="tableCell"></div>
          </div>
          {isLoading && (
            <SkeletonTable
              avatar
              threeDotsCols
              colsDesktop={3}
              rowsMobile={4}
              limit={limit}
            />
          )}
          {isSuccess &&
            listRoles.map((role) => (
              <Row
                key={role.id}
                item={role}
                archiveRoleMutation={archiveRoleMutation}
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
