import { useQuery } from '@tanstack/react-query';

import { getProjectDashboard } from '../../../services/api';

const useProjectDashboard = (projectId, granularity) => {
  console.log('useProjectDashboard', granularity);
  const parseData = (data) => {
    const logs = data?.logs?.map((log) => ({
      ...log,
      // bucket sẽ là ngày - trục x
      bucket: log.CreatedAt.split('T')[0],

      // 2 thằng này sẽ là data cho trục y, t fix cứng 2 cái tên này trong component Chart luôn
      averageDuration: log.duration,
      count: log.attempt_number,
    }));
    return { logs };
  };

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['project-dashboard', projectId, granularity],
    // tách api
    queryFn: () => getProjectDashboard(projectId, granularity),
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
