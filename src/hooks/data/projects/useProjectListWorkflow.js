import { useQuery } from '@tanstack/react-query';
import { getProjectListWorkflows } from '../../../services/api';
// import { toBeInTheDOM } from '@testing-library/jest-dom/dist/matchers';
const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};
const useProjectListWorkflow = (id) => {
  // console.log("useProjectListWorkflow id : ",id);
  const parseWorkflowsData = (data) => {
    // console.log("useProjectListWorkflow data : ",data);
    const repoURL = data?.repo_url;
    // console.log("useProjectListWorkflow repoURL : ",repoURL);
    // console.log("useProjectListWorkflow data.workflows : ",data?.workflows);
    const listWorkflows = data?.workflows?.map((workflow) => ({
      id: workflow?.workflow_id,
      workflow_name: workflow?.name,
      path: workflow?.path,
      state: workflow?.state,
      url_path: `https://${repoURL}/blob/main/${workflow?.path}`,
    }));
    // console.log('useProjectListWorkflow listWorkflows : ', listWorkflows);
    return listWorkflows;
  };

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['workflows', id],
    queryFn: () => {
      return getProjectListWorkflows(id);
      // return true;
    },
    select: (data) => parseWorkflowsData(data.data.data),
  });

  return {
    // // overview tab
    isSuccess,
    listWorkflows: data,
    isLoadingListWorkflows: isLoading,
    totalPage: Math.ceil(data?.length / DEFAULT_QUERY_STRING.limit),
    isError,
    // listUsersAndRoles,
    // updateProject,
    // addUserAndRole,
    // editUserAndRole,

    // // parameters tab
    // listParameters,
    // addParameter,
    // editParameter,
    // deleteParameter,
    // // parameters/stages
    // listStages,         addStage,
    // // parameters/environments
    // listEnvironments,   addEnvironment,
    // // parameters/versions
    // listVersions,       addVersion,

    // // agents tab
    // listAgents,
    // addAgent,
    // editAgent,
    // deleteAgent,

    // // tracking tab
    // getTracking,
  };
};

export default useProjectListWorkflow;
