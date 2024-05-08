import { useQuery } from '@tanstack/react-query';

import { getOrganizationDashboardTotals } from '../../../services/api';

const useOrganizationDashboard = (organizationId) => {
  const parseData = (data) => {
    const total = {
      project_count: data?.project_count,
      active_projects_count: data?.active_projects_count,
      pending_projects_count: data?.pending_projects_count,
      user_count: data?.user_count,
      workflow_count: data?.workflow_count,

      avg_duration: data?.avg_duration,
      total_updated: data?.total_updated,
      total_agent_actions: data?.total_agent_actions,
      total_updated_this_month: data?.total_updated_this_month,
      total_agent_actions_this_month: data?.total_agent_actions_this_month,
    };

    return { total };
  };

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['organization-dashboard', organizationId],
    // tách api
    queryFn: () => getOrganizationDashboardTotals(organizationId),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data),
  });

  return {
    total: data?.total,
    isSuccess,
    isLoading,
  };
};

export default useOrganizationDashboard;
