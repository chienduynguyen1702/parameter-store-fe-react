import React from 'react';

import Row from './Row';
import { NoData, Pagination } from '../../../../../components';

const Table = ({
  listWorkflows,
  isListWorkflowsSuccess,
  isLoading,
  totalPage,
  // setEditedItemId,
  // handleRemoveUser,
}) => {
  return (
    <>
      <div className="tableOuter">
        <div className="tableContainer">
          <div className="tableHead">
            <div className="tableCell pb-4">Workflow ID</div>
            <div className="tableCell">Name</div>
            <div className="tableCell">Path</div>
            <div className="tableCell">State</div>
          </div>
          {
            listWorkflows.map((workflow) => (
              <Row
                // key={workflow.id}
                item={workflow}
                // setEditedItemId={setEditedItemId}
                // handleRemoveUser={handleRemoveUser}
              />
            ))}
        </div>
        {isListWorkflowsSuccess && listWorkflows.length === 0 && <NoData />}
      </div>
      {((isListWorkflowsSuccess && listWorkflows.length !== 0) || isLoading) && (
        <Pagination pageCount={totalPage || 5} />
      )}
    </>
  );
};

export default Table;
