import React, { useEffect, useState } from 'react';

import Row from './Row';
import SkeletonTable from './Skeleton';

import { NoData, Pagination } from '../../../../components';

import { useListTasks } from '../../../../hooks/Data';
import { useSettingsTask } from '../../../../hooks/Setting';

const Table = ({ className, setCountTask }) => {
  const [activeId, setActiveId] = useState(1);

  // Data suggestions query
  const { taskPlatforms, taskTypes, taskStatus } = useSettingsTask();

  // Data tasks query
  const {
    listTasks,
    isSuccess,
    isLoading,
    pagination,
    limit,
    totalPage,
    archiveTaskMutation,
  } = useListTasks();
  // Set number count task in header
  useEffect(() => {
    isSuccess && setCountTask(pagination.total);
  }, [pagination, isSuccess, isLoading, setCountTask]);

  return (
    <>
      <div className="tableOuter">
        <div className="d-table w-100">
          <div className="d-none d-sm-table-row tableHead ">
            <div className="d-table-cell tableCell ps-2 pb-4">KOC</div>
            <div className="d-table-cell tableCell">Title</div>
            <div className="d-table-cell tableCell">Platform</div>
            <div className="d-table-cell tableCell">Type</div>
            <div className="d-table-cell tableCell">Status</div>
            <div className="d-table-cell tableCell">Evidence</div>
            <div className="d-table-cell tableCell">Deadline</div>
            <div className="d-table-cell tableCell"></div>
          </div>
          {isLoading && <SkeletonTable limit={limit} />}
          {isSuccess &&
            listTasks.length > 0 &&
            listTasks.map((task) => (
              <Row
                key={task.id}
                item={task}
                platformsQuery={taskPlatforms}
                typesQuery={taskTypes}
                statusQuery={taskStatus}
                activeId={activeId}
                setActiveId={setActiveId}
                archiveTaskMutation={archiveTaskMutation}
              />
            ))}
        </div>
        {isSuccess && listTasks.length === 0 && <NoData />}
      </div>
      {isSuccess && listTasks.length !== 0 && (
        <Pagination pageCount={totalPage || 1} />
      )}
    </>
  );
};
export default Table;
