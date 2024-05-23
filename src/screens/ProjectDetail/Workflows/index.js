import { Card, InputSelect } from '../../../components';
import 'reactflow/dist/style.css';
import {
  useListWorkflowRunJobs,
  useProjectListWorkflow,
} from '../../../hooks/data';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'; // Add the missing import statement for useMemo

import { useForm, FormProvider, set } from 'react-hook-form';
import JobNode from './JobNode/JobNode';
import ReactFlow, { Controls, Background, BackgroundVariant } from 'reactflow';

export default function Workflows() {
  const { id: projectId } = useParams();
  const { listWorkflows, isSuccess } = useProjectListWorkflow(projectId);

  const [selectWorkflowID, setSelectWorkflowID] = useState(''); // Add a state to store the selected workflow ID

  const {
    listWorkflowsJobs,
    isSuccess: isWorkflowRunSuccess,
    refetch,
  } = useListWorkflowRunJobs(projectId, selectWorkflowID);

  const setValue = (data) => {
    // console.log('data', data);
    const selectedWorkflow = listWorkflows.find(
      (workflow) => workflow.workflow_name === data,
    );
    if (selectedWorkflow) {
      setSelectWorkflowID(selectedWorkflow.id);
      refetch();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refetch(); // Use refetch here
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [projectId, refetch]);

  return (
    <Card
      title={'Workflows'}
      classTitle="title-purple"
      // className="mb-5"
      head={
        <>
          {isSuccess && (
            <div className="">
              <InputSelect
                tooltip="Filter by workflow"
                name="workflow"
                value={listWorkflows[0]?.workflow_name}
                suggestions={listWorkflows?.map((workflow) => ({
                  label: workflow.workflow_name,
                  value: workflow.workflow_name,
                }))}
                setValue={setValue}
              />
            </div>
          )}
        </>
      }
    >
      <div style={{ width: '80vw', height: '60vh', marginTop: '10px' }}>
        {isWorkflowRunSuccess ? (
          <JobNode job={listWorkflowsJobs} />
        ) : (
          <ReactFlow attributionPosition="top-right">
            <Controls />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        )}
      </div>
    </Card>
  );
}
