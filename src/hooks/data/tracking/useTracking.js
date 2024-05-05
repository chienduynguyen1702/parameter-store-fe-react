import { useQuery } from '@tanstack/react-query';
import { getTracking } from '../../../services/api';

const useTracking = (id) => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => {
      return getTracking(id);
      // return true;
    },
    select: (data) => combineLogs(data.data.data),
  });
  const combineLogs = (data) => {
    // console.log("combineLogs data",data)
    const logs = [...data?.agent_logs, ...data?.project_logs].map((log) => {
      // console.log("log",log)
      const isAgentLog = log.hasOwnProperty('agent_id');
      const actorName = isAgentLog ? log.agent.name : log.user.username;

      return {
        ...log,
        [actorName]: log[isAgentLog ? 'agent' : 'user'].name,
        actor: actorName,
      };
    });
    const sortedLogs = logs.sort(
      (a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt),
    );
    // console.log("sortedLogs",sortedLogs)
    return sortedLogs;
  };

  return {
    data,
    isSuccess,
    isLoading,
  };
};

export default useTracking;
