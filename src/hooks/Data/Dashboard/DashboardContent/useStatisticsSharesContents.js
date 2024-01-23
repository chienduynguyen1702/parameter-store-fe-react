import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../../useQueryString';

import { getStatisticsContentsOfShares } from '../../../../services/api';
import { formatDateFromData } from '../../../../utils/helpers';

export default function useStatisticsSharesContents(granularity) {
  const parseData = useCallback((data) => {
    return data.data.data.map((item) => {
      return {
        bucket: formatDateFromData(item.bucket),
        delta: item.delta,
      };
    });
  }, []);

  const { queryString } = useQueryString();

  const statisticsShares = useQuery({
    queryKey: ['statistics-contents-shares', queryString, granularity],
    queryFn: () => getStatisticsContentsOfShares(granularity, queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data),
  });

  return {
    statisticsShares,
  };
}
