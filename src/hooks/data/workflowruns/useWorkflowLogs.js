import { useQuery } from '@tanstack/react-query';
import { getWorkflowLogs } from '../../../services/api';
import moment from 'moment';
const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};
const useWorkflowLogs = (project_id, workflow_id) => {
  const parseWorkflowLogs = (data) => {
    // console.log('data', data.logs);
    const listWorkflowsJobs = data?.logs?.map((log) => ({
      id: log?.ID,
      created_at: log?.CreatedAt,
      attempt_number: log?.attempt_number,
      workflow_run_id: log?.workflow_run_id,
      state: log?.state,
      started_at: log?.started_at,
      displayString: `${moment(log?.started_at).format(
        'YYYY-MM-DD hh:mm:ss',
      )} Run ID: ${log?.workflow_run_id} Attempt: ${log?.attempt_number}`,
    }));

    // console.log('listWorkflowsJobs', listWorkflowsJobs);
    return listWorkflowsJobs;
  };

  const {
    data: workflowLogs,
    isSuccess,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['workflows', 'logs', project_id, workflow_id],
    queryFn: () => {
      return getWorkflowLogs(project_id, workflow_id);
    },
    select: (data) => parseWorkflowLogs(data.data.data),
  });

  return {
    isSuccess,
    listWorkflowsLogs: workflowLogs,
    refetch,
  };
};

export default useWorkflowLogs;
