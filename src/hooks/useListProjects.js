import { useCallback, useMemo, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

import useQueryString from './useQueryString';
import { fromNow } from '../utils/helpers';
import { getListProjects } from '../services/api';

export default function useListProjects() {
  const [totalPage, setTotalPage] = useState(1);

  const defaultQueryString = useMemo(() => {
    return {
      page: 1,
      limit: 10,
    };
  }, []);

  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  const parseData = useCallback((data) => {
    const projects = data?.result?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        createdAt: moment(item.created_at).format('DD/MM/YYYY'),
        updatedAt: fromNow(item.updated_at),
      };
    });
    const pagination = {
      total: data.pagination.total,
      currentPage: data.pagination.currentPage,
      totalPage: data.pagination.totalPage,
      limit: data.pagination.limit,
    };
    return { pagination, projects };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['projects', queryString],
    queryFn: () => getListProjects(queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
  });

  useEffect(() => {
    if (data?.pagination?.totalPage) {
      setTotalPage(data.pagination.totalPage);
    }
  }, [data?.pagination?.totalPage]);

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, limit, page, queryString, setQueryString]);

  return {
    listProjects: data?.projects,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    page,
    limit,
    totalPage: totalPage,
  };
}
