import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAmountLoggerByDay } from '../services/api';
import useQueryString from './useQueryString';

export default function useAmountLoggerByDay() {
  const { queryString } = useQueryString();
  const { typeLog, from, to } = queryString;

  const parseData = useCallback(
    (data) => {
      const loggers = data.map((item) => {
        return {
          date: item.date.split('T')[0],
          total: Number(item.total_api_calls),
          success: Number(item.total_success_api_calls),
          error:
            Number(item.total_api_calls) - Number(item.total_success_api_calls),
        };
      });
      loggers.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      return { loggers };
    },
    [typeLog, from, to],
  );

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['amount-logger-by-day', typeLog, from, to],
    queryFn: () => getAmountLoggerByDay({ typeLog, from, to }),
    staleTime: 60 * 1000,
    select: (data) => parseData(data.data.data),
    onSuccess: (data) => {},
    retry: 2,
  });

  return {
    listLoggers: data?.loggers,
    isSuccess,
    isLoading,
  };
}
