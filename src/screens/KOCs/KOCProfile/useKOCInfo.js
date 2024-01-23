import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router';
import { getMyInfo, getUser } from '../../../services/api';

export default function useKOCInfo() {
  const { id } = useParams();

  const kocQuery = useQuery({
    queryKey: ['KOCInformation', id],
    queryFn: () => {
      if (id === 'me') {
        return getMyInfo();
      }
      return getUser(id);
    },
    staleTime: 60 * 1000,
    enabled: !!id,
    retry: 3,
    select: (data) => data.data.data,
  });

  const { pathname } = useLocation();
  const enabledFilter =
    !pathname.includes('other-content') && !pathname.includes('product-sold');

  return {
    id: id,
    data: kocQuery.data,
    enabledFilter,
  };
}
