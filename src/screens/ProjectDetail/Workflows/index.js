// import { useCallback, useState, useRef } from 'react';
// import { useQueryString } from '../../../hooks';

import 'reactflow/dist/style.css';
import { useListWorkflowRunJobs } from '../../../hooks/data';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import JobNode from './JobNode/JobNode';
// import { Jobs } from '../../../mocks/react-flow-job-step'; // Import NODES from the correct path
import { get } from 'react-hook-form';

export default function Workflows() {
  const { id: projectId } = useParams();
  const { listWorkflowsJobs, isSuccess, refetch } = useListWorkflowRunJobs(
    projectId,
    '83440446',
  );

  useEffect(() => {
    const interval = setInterval(() => {
      refetch(); // Use refetch here
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [projectId, refetch]);
  // console.log('listWorkflowsJobs', listWorkflowsJobs);
  return (
    <>
      {isSuccess ? (
        <div style={{ width: '80vw', height: '60vh' }}>
          <JobNode job={listWorkflowsJobs} />
        </div>
      ) : null}
    </>
  );
}
