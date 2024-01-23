import { useQuery } from '@tanstack/react-query';

import { getLiquidationById } from '../../../services/api';
import useQueryString from '../../../hooks/useQueryString';

export default function useOverview() {
  const { queryString } = useQueryString();

  const { fileId } = queryString;

  const parseData = (data) => {
    const result = {
      id: data.id,
      name: data.name,
      receiver: {
        name: data.users[0].username,
        color: '#ff6a55',
      },
      pic: data.settings.filter((item) => item.type === 'liquidation-pic')[0],
      category: data.settings.filter(
        (item) => item.type === 'liquidation-category',
      )[0],
      status: data.settings.filter(
        (item) => item.type === 'liquidation-status',
      )[0],
      fromDate: new Date(data.from).toLocaleDateString('en-GB'),
      toDate: new Date(data.to).toLocaleDateString('en-GB'),
      total: Number(data.cost),
    };
    return { liquidationOverview: result };
  };

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['liquidation-item', fileId],
    queryFn: () => getLiquidationById(fileId),
    select: (data) => parseData(data.data.data),
    staleTime: 10 * 1000,
  });

  return {
    isSuccess,
    isLoading,
    liquidationOverview: data?.liquidationOverview,
  };
}
