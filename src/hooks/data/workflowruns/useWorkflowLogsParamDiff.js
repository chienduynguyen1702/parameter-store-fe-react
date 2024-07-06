import { useQuery } from '@tanstack/react-query';
import { getParamDiffInWorkflowLog } from '../../../services/api';
const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};
const useParamDiffInWorkflowLog = (
  project_id,
  workflow_id,
  workflow_log_id,
) => {
  const parseWorkflowsData = (data) => {
    const parameterDiff = data.diff;
    console.log('listWorkflowsJobs', parameterDiff);
    return parameterDiff;
  };

  const { data, isSuccess, isError, refetch } = useQuery({
    queryKey: ['workflows', 'runs', project_id, workflow_id, workflow_log_id],
    queryFn: () => {
      return getParamDiffInWorkflowLog(
        project_id,
        workflow_id,
        workflow_log_id,
      );
    },
    select: (data) => parseWorkflowsData(data.data),
  });

  return {
    isSuccess,
    parameterDiffInWorkflowLog: data,
    isError,
    refetch,
  };
};

export default useParamDiffInWorkflowLog;
