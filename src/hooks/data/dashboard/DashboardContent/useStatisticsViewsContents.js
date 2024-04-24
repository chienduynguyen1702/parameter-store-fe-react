import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../../useQueryString';

import { getStatisticsContentsOfViews } from '../../../../services/api';
import { formatDateFromData } from '../../../../utils/helpers';

export default function useStatisticsViewsContents(granularity) {
  const parseData = useCallback((data) => {
    return data.data.data.map((item) => {
      return {
        bucket: formatDateFromData(item.bucket),
        delta: item.delta,
      };
    });
  }, []);

  const { queryString } = useQueryString();

  const statisticsViews = useQuery({
    queryKey: ['statistics-contents-views', queryString, granularity],
    queryFn: () => getStatisticsContentsOfViews(granularity, queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data),
  });

  return {
    statisticsViews,
  };
}
