import { useQuery } from '@tanstack/react-query';
import { getTracking } from '../../../services/api';

const useTracking = (id, start_date, to_date) => {
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
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['organizations', id, start_date, to_date],
    queryFn: () => {
      return getTracking(id, start_date, to_date);
      // return true;
    },
    select: (data) => combineLogs(data.data.data),
  });

  return {
    data,
    isSuccess,
    isLoading,
  };
};

export default useTracking;
