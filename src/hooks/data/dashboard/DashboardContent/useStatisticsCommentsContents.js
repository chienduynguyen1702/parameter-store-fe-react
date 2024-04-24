import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../../useQueryString';

import { getStatisticsContentsOfComments } from '../../../../services/api';
import { formatDateFromData } from '../../../../utils/helpers';

export default function useStatisticsCommentsContents(granularity) {
  const parseData = useCallback((data) => {
    return data.data.data.map((item) => {
      return {
        bucket: formatDateFromData(item.bucket),
        delta: item.delta,
      };
    });
  }, []);

  const { queryString } = useQueryString();

  const statisticsComments = useQuery({
    queryKey: ['statistics-contents-comments', queryString, granularity],
    queryFn: () => getStatisticsContentsOfComments(granularity, queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data),
  });

  return {
    statisticsComments,
  };
}
