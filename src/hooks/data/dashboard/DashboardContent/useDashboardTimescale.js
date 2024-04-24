import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../../useQueryString';
import { dateToUrl } from '../../../../utils/helpers';

import {
  getStatisticsContentsOfComments,
  getStatisticsContentsOfLikes,
  getStatisticsContentsOfShares,
  getStatisticsContentsOfViews,
} from '../../../../services/api';

export default function useDashboardTimescale() {
  const { queryString, setQueryString } = useQueryString();

  const { from, to } = queryString;

  const defaultQueryString = useMemo(() => {
    const now = new Date();
    return {
      from: dateToUrl(new Date(now.getFullYear(), now.getMonth(), 1)),
      to: dateToUrl(new Date()),
    };
  }, []);

  useEffect(() => {
    if (!from || !to) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, from, to, queryString, setQueryString]);

  const statisticsComments = useQuery({
    queryKey: ['statistics-contents-comments', queryString],
    queryFn: () => getStatisticsContentsOfComments('day', queryString),
    staleTime: 10 * 1000,
    select: (data) => {
      const rangeTime = data.data.data.map((item) => item.bucket);
      const comments = data.data.data.map((item) => item.delta);
      return { rangeTime, comments };
    },
  });

  const statisticsLikes = useQuery({
    queryKey: ['statistics-contents-likes', queryString],
    queryFn: () => getStatisticsContentsOfLikes('day', queryString),
    staleTime: 10 * 1000,
    select: (data) => data.data.data.map((item) => item.delta),
  });

  const statisticsShares = useQuery({
    queryKey: ['statistics-contents-shares', queryString],
    queryFn: () => getStatisticsContentsOfShares('day', queryString),
    staleTime: 10 * 1000,
    select: (data) => data.data.data.map((item) => item.delta),
  });

  const statisticsViews = useQuery({
    queryKey: ['statistics-contents-views', queryString],
    queryFn: () => getStatisticsContentsOfViews('day', queryString),
    staleTime: 10 * 1000,
    select: (data) => data.data.data.map((item) => item.delta),
  });

  return {
    statisticsTimescale: {
      isSuccess:
        statisticsComments.isSuccess &&
        statisticsLikes.isSuccess &&
        statisticsShares.isSuccess &&
        statisticsViews.isSuccess,
      rangeTime: statisticsComments.data?.rangeTime,
      comments: {
        name: 'Comments',
        delta: statisticsComments.data?.comments,
      },
      likes: {
        name: 'Likes',
        delta: statisticsLikes.data,
      },
      shares: {
        name: 'Shares',
        delta: statisticsShares.data,
      },
      views: {
        name: 'Views',
        delta: statisticsViews.data,
      },
    },
  };
}
