import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../../useQueryString';

import { getStatisticsContentsOfLikes } from '../../../../services/api';
import { formatDateFromData } from '../../../../utils/helpers';

export default function useStatisticsLikesContents(granularity) {
  const parseData = useCallback((data) => {
    return data.data.data.map((item) => {
      return {
        bucket: formatDateFromData(item.bucket),
        delta: item.delta,
      };
    });
  }, []);

  const { queryString } = useQueryString();

  const statisticsLikes = useQuery({
    queryKey: ['statistics-contents-likes', queryString, granularity],
    queryFn: () => getStatisticsContentsOfLikes(granularity, queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data),
  });

  return {
    statisticsLikes,
  };
}
