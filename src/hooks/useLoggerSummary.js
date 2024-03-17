import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLoggerSummary } from '../services/api';
import useQueryString from './useQueryString';

export default function useLoggerSummary() {
  const { queryString, setQueryString } = useQueryString();

  const { from, to } = queryString;

  const parseData = useCallback((data) => {
    const loggers = {
      successApiCalls: data.success_api_calls,
      totalApiCalls: data.total_api_calls,
    };
    return { loggers };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['logger-summary', from, to],
    queryFn: () => getLoggerSummary({ from, to }),
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
