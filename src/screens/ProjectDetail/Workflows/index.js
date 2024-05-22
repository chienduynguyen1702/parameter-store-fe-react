import { Card, RHFInputSelect } from '../../../components';
import 'reactflow/dist/style.css';
import { useListWorkflowRunJobs } from '../../../hooks/data';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useQueryString } from '../../../hooks';

import { useForm, FormProvider } from 'react-hook-form';
import JobNode from './JobNode/JobNode';

export default function Workflows({ parentFc }) {
  const { queryString, setQueryString } = useQueryString();
  const setting = useMemo(() => {
    const workflow = queryString.workflow;
    return {
      workflow: workflow,
    };
  }, [queryString.workflow]);
  const defaultValues = useMemo(() => {
    const defaultValues = {};
    setting.workflow && (defaultValues.workflow = setting.workflow);
    return defaultValues;
  }, [setting]);

  const { id: projectId } = useParams();
  const { listWorkflowsJobs, isSuccess, refetch } = useListWorkflowRunJobs(
    projectId,
    '83440446',
  );
  const WORKFLOWS = [
    {
      id: '83440446',
      name: 'Clouding Frontend CD',
    },
    {
      id: '83440447',
      name: 'Clouding Backend CI',
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      refetch(); // Use refetch here
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [projectId, refetch]);

  const method = useForm({ defaultValues }); // Initialize useForm

  const handleSubmit = (data) => {
    const workflows = { ...queryString };

    if (!!workflows) {
      // delete queryString;
    }
    const workflowSettings = data.workflow;
    // Add selected stages and environments to URL workflows
    if (workflowSettings) {
      workflows.workflow = workflowSettings;
    }
    // Reset page to 1
    workflows.page = 1;

    setQueryString(workflows);
    parentFc(false);
  };

  // console.log('listWorkflowsJobs', listWorkflowsJobs);
  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <Card
          title={'Workflows'}
          classTitle="title-purple"
          // className="mb-5"
          head={
            <>
              <div className="">
                <RHFInputSelect
                  // label="Workflows"
                  tooltip="Filter by workflow"
                  name="workflows"
                  suggestions={WORKFLOWS?.map((workflow) => ({
                    label: workflow.name,
                    value: workflow.name,
                  }))}
                  defaultValue={WORKFLOWS[0]?.name}
                />
              </div>
            </>
          }
        >
          {isSuccess ? (
            <div style={{ width: '80vw', height: '60vh', marginTop: '10px' }}>
              <JobNode job={listWorkflowsJobs} />
            </div>
          ) : null}
        </Card>
      </form>
    </FormProvider>
  );
}
