import { useQuery } from '@tanstack/react-query';

import { getProjectDashboardLogs } from '../../../services/api';

const useProjectDashboard = (projectId, granularity) => {
  // console.log('useProjectDashboard', granularity);
  const parseData = (data) => {
    const logs = data?.logs_with_granularity?.map((log) => ({
      // ...log,
      // bucket sẽ là ngày - trục x
      bucket: log.period_start,

      // 2 thằng này sẽ là data cho trục y, t fix cứng 2 cái tên này trong component Chart luôn
      averageDuration: log.avg_duration_in_period,
      count: log.count,
    }));
    return { logs };
  };

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['project-dashboard', projectId, granularity],
    // tách api
    queryFn: () => getProjectDashboardLogs(projectId, granularity),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data),
  });

  return {
    logs: data?.logs,
    isSuccess,
    isLoading,
  };
};

export default useProjectDashboard;
