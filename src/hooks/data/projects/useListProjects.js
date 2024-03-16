import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../useQueryString';
import { getListUser } from '../../../services/api';
import { PROJECTS } from '../../mocks/projects';

const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};

const useListProjects = (defaultParams) => {
  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  const parseData = useCallback((data) => {
    const projects = PROJECTS?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        color: item.color,
        usersCount: item.users_count,
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
    queryFn: () => getListUser(queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
  });

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(DEFAULT_QUERY_STRING);
    }
  }, [limit, page, queryString, setQueryString]);

  return {
    listProjects: data?.projects,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
  };
};

export default useListProjects;
