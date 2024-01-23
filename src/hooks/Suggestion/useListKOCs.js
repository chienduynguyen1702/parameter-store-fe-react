import { useQuery } from '@tanstack/react-query';
import { getListKOC } from '../../services/api';

export default function useListKOCs() {
  const listKOCs = useQuery({
    queryKey: ['suggestion-kocs'],
    queryFn: () => getListKOC({ page: 1, limit: 1000 }),
    staleTime: 10 * 1000,
    select: (data) =>
      data.data.data.users.map((item) => {
        return {
          id: item.id,
          name: item.username,
        };
      }),
  });
  return { listKOCs };
}
