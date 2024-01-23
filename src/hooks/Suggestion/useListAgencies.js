import { useQuery } from '@tanstack/react-query';
import { getListAgency } from '../../services/api';

export default function useListAgencies() {
  const listAgencies = useQuery({
    queryKey: ['suggestion-agencies'],
    queryFn: () => {
      return getListAgency();
    },
    select: (data) => {
      return data.data.data.map((item) => ({
        id: Number(item.id),
        name: item.username,
      }));
    },
  });
  return {
    listAgencies,
  };
}
