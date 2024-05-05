import React from 'react';
import { useParams } from 'react-router-dom';

import Row from './Row';
import { NoData, Pagination } from '../../../../../components';
import SkeletonTable from './Skeleton';
import { useProjectListWorkflow } from '../../../../../hooks/data';

const Table = (
  {
    // listWorkflows,
    // isListWorkflowsSuccess,
    // isLoading,
    // totalPage,
    // setEditedItemId,
    // handleRemoveUser,
  },
) => {
  const { id } = useParams();
  const { listWorkflows, isLoadingListWorkflows, totalPage, isSuccess } =
    useProjectListWorkflow(id);
  // console.log('listWorkflows', listWorkflows);
  // console.log('isLoadingListWorkflows', isLoadingListWorkflows);
  return (
    <div>
      <div className="tableOuter">
        <div className="tableContainer">
          <div className="tableHead">
            <div className="tableCell pb-4">Workflow ID</div>
            <div className="tableCell">Name</div>
            <div className="tableCell">Path</div>
            <div className="tableCell">State</div>
          </div>
          {isLoadingListWorkflows && <SkeletonTable />}
          {/* {<SkeletonTable />} */}
          {listWorkflows?.map((workflow) => (
            <Row
              // key={workflow.id}
              item={workflow}
              // setEditedItemId={setEditedItemId}
              // handleRemoveUser={handleRemoveUser}
            />
          ))}
        </div>
        {isSuccess && listWorkflows.length === 0 && <NoData />}
      </div>
      {((isSuccess && listWorkflows.length !== 0) ||
        isLoadingListWorkflows) && <Pagination pageCount={totalPage || 0} />}
    </div>
  );
};

export default Table;
