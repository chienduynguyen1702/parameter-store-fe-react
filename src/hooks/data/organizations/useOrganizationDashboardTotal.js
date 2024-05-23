import { useQuery } from '@tanstack/react-query';

import { getOrganizationDashboardTotals } from '../../../services/api';

const useOrganizationDashboard = (organizationId, project, from, to) => {
  const parseData = (data) => {
    // console.log('useOrganizationDashboard data', data);
    //   [
    //     {
    //         "value": 6,
    //         "name": "project_count",
    //         "label": "Projects Count"
    //     },
    //     {
    //         "value": 2,
    //         "name": "active_projects_count",
    //         "label": "Active Projects Count"
    //     },
    //     {
    //         "value": 4,
    //         "name": "active_agent",
    //         "label": "Active Agent"
    //     },
    //     {
    //         "value": 4,
    //         "name": "user_count",
    //         "label": "User Count"
    //     },
    //     {
    //         "value": 4,
    //         "name": "workflow_count",
    //         "label": "Workflow Count"
    //     },
    //     {
    //         "value": 122000,
    //         "name": "avg_duration",
    //         "label": "Average Duration"
    //     },
    //     {
    //         "value": 118,
    //         "name": "total_updated",
    //         "label": "Total Updated"
    //     },
    //     {
    //         "value": 118,
    //         "name": "total_updated_this_month",
    //         "label": "Total Updated This Month"
    //     },
    //     {
    //         "value": 73,
    //         "name": "total_agent_actions",
    //         "label": "Total Agent Actions"
    //     },
    //     {
    //         "value": 73,
    //         "name": "total_agent_actions_this_month",
    //         "label": "Total Agent Actions This Month"
    //     }
    // ]
    const total = data;

    // console.log('useOrganizationDashboard total', total);
    return { total };
  };

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [
      'organization-dashboard-total',
      organizationId,
      project,
      from,
      to,
    ],
    // tách api
    queryFn: () =>
      getOrganizationDashboardTotals(organizationId, project, from, to),
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
