import { useQuery } from '@tanstack/react-query';
import { getListHashtags } from '../../services/api';

export default function useListHashtags() {
  const listHashtags = useQuery({
    queryKey: ['suggestion-hashtags'],
    queryFn: () => getListHashtags(),
    staleTime: 10 * 1000,
    select: (data) =>
      data.data.data.map((item, index) => {
        return {
          id: index + '',
          text: item,
        };
      }),
  });
  return { listHashtags };
}
