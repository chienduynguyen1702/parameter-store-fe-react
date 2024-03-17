import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../useQueryString';
import { getListUser } from '../../../services/api';
import { AGENTS } from '../../mocks/agents';

const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};

const useListAgents = (defaultParams) => {
  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  const parseData = useCallback((data) => {
    const agents = AGENTS?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        stage: {
          id: item.stage.id,
          name: item.stage.name,
        },
        environment: {
          id: item.environment.id,
          name: item.environment.name,
        },
        project: item.project.map((project) => {
          return {
            id: project.id,
            name: project.name,
          };
        }),
      };
    });

    const pagination = {
      total: data.pagination.total,
      currentPage: data.pagination.currentPage,
      totalPage: data.pagination.totalPage,
      limit: data.pagination.limit,
    };
    return { pagination, agents };
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
    listAgents: data?.agents,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
  };
};

export default useListAgents;
