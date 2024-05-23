import { useQuery } from '@tanstack/react-query';

import { getOrganizationDashboardTotals } from '../../../services/api';

const useOrganizationDashboard = (organizationId, project, from, to) => {
  const parseData = (data) => {
    const total = data;

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
