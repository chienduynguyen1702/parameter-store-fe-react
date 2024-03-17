import { useCallback, useMemo, useEffect } from 'react';
import useQueryString from './useQueryString';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getListLogger } from '../services/api';

const OPTIONS = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

export default function useListLogger() {
  const queryClient = useQueryClient();

  const { queryString, setQueryString } = useQueryString();

  const { page, limit, typeTabLog, responseStatus, sortByTime, from, to } =
    queryString;
  // console.log('query string', queryString);

  const defaultQueryString = useMemo(() => {
    // console.log('default query string', responseStatus);
    if (typeTabLog || responseStatus || sortByTime) {
      return {
        page: 1,
        limit: 10,
        typeTabLog,
        responseStatus,
        sortByTime,
      };
    }
    return {
      page: 1,
      limit: 10,
    };
  }, []);

  const parseData = useCallback((data) => {
    const loggers = data?.loggers?.map((item) => {
      return {
        ...item,
        time: new Date(item?.time).toLocaleDateString('en-US', OPTIONS),
      };
    });

    const pagination = {
      total: data.pagination.total,
      currentPage: data.pagination.currentPage,
      totalPage: data.pagination.totalPage,
      limit: data.pagination.limit,
    };
    return { pagination, loggers };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [
      'keywordsModel',
      page,
      limit,
      typeTabLog,
      responseStatus,
      sortByTime,
      from,
      to,
    ],
    queryFn: () =>
      getListLogger({
        page,
        limit,
        type_tab_log: typeTabLog,
        response_status: responseStatus,
        time: sortByTime,
        from,
        to,
      }),
    staleTime: 60 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
    onSuccess: (data) => {
      const preTotalPage = queryClient.getQueryData(['totalPage']);
      if (preTotalPage !== data.pagination.totalPage) {
        queryClient.setQueryData(['totalPageUsers'], data.pagination.totalPage);
      }
    },
  });

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, limit, page, queryString, setQueryString, from, to]);

  return {
    listLoggers: data?.loggers,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    page,
    limit,
    totalPage: data?.pagination?.totalPage,
  };
}
