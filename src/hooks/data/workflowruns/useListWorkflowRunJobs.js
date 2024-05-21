import { useQuery } from '@tanstack/react-query';
import { getWorkflowsRunID } from '../../../services/api';
const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};
const useListWorkflowRunJobs = (project_id, workflow_id) => {
  const parseWorkflowsData = (data) => {
    const listWorkflowsJobs = data.jobs;
    return listWorkflowsJobs;
  };

  const { data, isSuccess, isLoading, isError, refetch } = useQuery({
    queryKey: ['workflows', 'runs', project_id, workflow_id],
    queryFn: () => {
      return getWorkflowsRunID(project_id, workflow_id);
      // return true;
    },
    select: (data) => parseWorkflowsData(data.data.data),
  });

  return {
    // // overview tab
    isSuccess,
    listWorkflowsJobs: data,
    isLoadingListWorkflows: isLoading,
    totalPage: Math.ceil(data?.length / DEFAULT_QUERY_STRING.limit),
    isError,
    refetch,
  };
};

export default useListWorkflowRunJobs;
