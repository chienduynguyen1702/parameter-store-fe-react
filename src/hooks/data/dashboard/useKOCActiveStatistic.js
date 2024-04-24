import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import useQueryString from '../../useQueryString';
import { dateToUrl } from '../../../utils/helpers';

import { getStatisticsKOCActive } from '../../../services/api';

export default function useKOCActiveStatistic(time) {
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

  const changeArrayInt = useCallback((arr) => {
    return (arr = arr.map(function (element) {
      return parseInt(element);
    }));
  }, []);

  const parseData = (data) => {
    return changeArrayInt(data.data);
  };
  const statisticsKOCActive = useQuery({
    queryKey: ['statistic-kocs-active', queryString, time],
    queryFn: () =>
      getStatisticsKOCActive({
        ...queryString,
        time: time,
      }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });
  return {
    isSuccess: statisticsKOCActive.isSuccess,
    KOCs: {
      name: 'KOCs',
      delta: statisticsKOCActive?.data,
    },
  };
}
