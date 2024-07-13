import { Card, InputSelect, NoData } from '../../../components';
import 'reactflow/dist/style.css';
import {
  useListWorkflowRunJobs,
  useProjectListWorkflow,
  useWorkflowLogs,
  useWorkflowLogsParamDiff,
} from '../../../hooks/data';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'; // Add the missing import statement for useMemo

import { useForm, FormProvider, set } from 'react-hook-form';
import JobNode from './JobNode/JobNode';
import ReactFlow, { Controls, Background, BackgroundVariant } from 'reactflow';
import { Col, Row } from 'react-bootstrap';
import TableParamDiffInStage from './TableParamDiff/Table';

export default function Workflows() {
  const { id: projectId } = useParams();
  const { listWorkflows, isSuccess } = useProjectListWorkflow(projectId);

  const [selectWorkflowID, setSelectWorkflowID] = useState(''); // Add a state to store the selected workflow ID
  const [selectWorkflowLogID, setSelectWorkflowLogID] = useState(''); // Add a state to store the selected workflow ID

  const {
    listWorkflowsLogs,
    isSuccess: isWorkflowLogsSuccess,
    refetch: refetchLogs,
  } = useWorkflowLogs(projectId, selectWorkflowID);
  if (
    isWorkflowLogsSuccess &&
    !selectWorkflowLogID &&
    listWorkflowsLogs.length > 0
  ) {
    setSelectWorkflowLogID(listWorkflowsLogs[0].id);
  }
  const {
    listWorkflowsJobs,
    isSuccess: isWorkflowRunSuccess,
    refetch,
  } = useListWorkflowRunJobs(projectId, selectWorkflowID);
  if (isWorkflowRunSuccess && !selectWorkflowID && listWorkflows.length > 0) {
    setSelectWorkflowID(listWorkflows[0]?.id);
  }

  const {
    isSuccess: isParamDiffSuccess,
    parameterDiffInWorkflowLog,
    refetch: refetchParamDiff,
  } = useWorkflowLogsParamDiff(
    projectId,
    selectWorkflowID,
    selectWorkflowLogID,
  );

  const setValue = (data) => {
    // console.log('data', data);
    const selectedWorkflow = listWorkflows.find(
      (workflow) => workflow.workflow_name === data,
    );
    if (selectedWorkflow) {
      setSelectWorkflowID(selectedWorkflow.id);
      refetch();
      refetchLogs();
    }
  };

  const setWorkflowLogs = (data) => {
    // console.log('workflow Log id', data);
    const selectedWorkflowLog = listWorkflowsLogs.find(
      (log) => log.displayString === data || log.id === data,
    );
    if (data) {
      setSelectWorkflowLogID(selectedWorkflowLog.id);
      // console.log('selectWorkflowLogID', selectWorkflowLogID);
      refetchParamDiff();
    }
  };

  useEffect(() => {
    const errorHandler = (e) => {
      if (
        e.message.includes(
          'ResizeObserver loop completed with undelivered notifications' ||
            'ResizeObserver loop limit exceeded',
        )
      ) {
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay',
        );
        if (resizeObserverErr) {
          resizeObserverErr.style.display = 'none';
        }
      }
    };
    window.addEventListener('error', errorHandler);

    const interval = setInterval(() => {
      // console.log('listWorkflowsJobs', listWorkflowsJobs);
      if (listWorkflowsJobs.conclusion === 'in_progress') {
        refetch(); // Use refetch workflow jobs in workflow progress
        refetchParamDiff(); // Use refetch parameter diff in workflow log
      }
    }, 1000);

    return () => {
      window.removeEventListener('error', errorHandler);
      clearInterval(interval);
    };
  }, [projectId, refetch, refetchParamDiff, listWorkflowsJobs]);

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
                tooltip="Filter by workflow name"
                label={'Name'}
                value={listWorkflows[0]?.workflow_name}
                suggestions={listWorkflows?.map((workflow) => ({
                  label: workflow.workflow_name,
                  value: workflow.workflow_name,
                }))}
                setValue={setValue}
              />
            </div>
          )}
          {isWorkflowLogsSuccess && (
            <div className="">
              <InputSelect
                className={'ml-3'}
                tooltip="Filter by workflow history"
                label={'History'}
                value={listWorkflowsLogs[0]?.displayString}
                suggestions={listWorkflowsLogs?.map((workflowLog) => ({
                  label: workflowLog.displayString,
                  value: workflowLog.id,
                }))}
                setValue={setWorkflowLogs}
              />
            </div>
          )}
        </>
      }
    >
      <Row>
        <Card
          title={`Workflow Progress`}
          classTitle="title-green"
          // className="mb-5"
        >
          <div style={{ width: '75vw', height: '50vh', marginTop: '10px' }}>
            {isWorkflowRunSuccess ? (
              <JobNode job={listWorkflowsJobs} />
            ) : (
              <ReactFlow attributionPosition="top-right">
                <Controls />
                <Background
                  variant={BackgroundVariant.Dots}
                  gap={12}
                  size={1}
                />
              </ReactFlow>
            )}
          </div>
        </Card>
      </Row>
      <Row>
        {isParamDiffSuccess &&
          parameterDiffInWorkflowLog?.stages &&
          parameterDiffInWorkflowLog?.stages?.map((stage) => (
            <TableParamDiffInStage stage={stage} />
          ))}
        {!isParamDiffSuccess && (
          <Card
            title={`Parameter change in workflow`}
            classTitle="title-yellow"
            // className="mb-5"
          >
            <NoData />
          </Card>
        )}
      </Row>
    </Card>
  );
}
