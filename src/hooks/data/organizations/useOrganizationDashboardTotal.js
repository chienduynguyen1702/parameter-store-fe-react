import { useQuery } from '@tanstack/react-query';

import { getOrganizationDashboardTotals } from '../../../services/api';

const useOrganizationDashboard = (organizationId) => {
  const parseData = (data) => {
    const total = {
      count_total_updated: data?.count_total_updated,
      count_total_agent_actions: data?.count_total_agent_actions,
      count_agent_actions_this_month: data?.count_agent_actions_this_month,
      count_agent_actions_this_week: data?.count_agent_actions_this_week,
      count_updated_this_month: data?.count_updated_this_month,
      count_updated_this_week: data?.count_updated_this_week,
      count_workflows: data?.count_workflows,
      avg_duration_of_workflows_current_month:
        data?.avg_duration_of_workflows_current_month,
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
