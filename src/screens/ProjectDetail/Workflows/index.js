// import { useCallback, useState, useRef } from 'react';
// import { useQueryString } from '../../../hooks';

import 'reactflow/dist/style.css';

// import { useParams } from 'react-router-dom';

import JobNode from './JobNode/JobNode';
import { Jobs } from '../../../mocks/react-flow-job-step'; // Import NODES from the correct path

export default function Workflows() {
  // const refWorkflows = useRef();

  return (
    // <div className={cn(styles.container)}>
    <>
      <div style={{ width: '80vw', height: '40vh' }}>
        <JobNode job={Jobs} />
      </div>
      {/* <div ref={refWorkflows}>
        <div className="print-highlight-dashboard"></div>
      </div> */}
    </>
  );
}
