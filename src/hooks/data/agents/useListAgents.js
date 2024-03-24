import { useCallback, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import useQueryString from '../../useQueryString';
import { addAgent, editAgent, getListUser } from '../../../services/api';
import { AGENTS } from '../../mocks/agents';
import { toast } from 'react-toastify';

const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};

const useListAgents = () => {
  const queryClient = useQueryClient();
  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(DEFAULT_QUERY_STRING);
    }
  }, [limit, page, queryString, setQueryString]);

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
        // project: item.project.map((project) => {
        //   return {
        //     id: project.id,
        //     name: project.name,
        //   };
        // }),
        last_used: item.last_used,
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
    queryKey: ['agents', queryString],
    queryFn: () => getListUser(queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
  });

  const addAgentMutation = useMutation(
    (data) => {
      return addAgent(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['agents'],
        });
        toast.success('Add agent successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  const editAgentMutation = useMutation(
    (id, data) => {
      return editAgent(id, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['agents'],
        });
        toast.success('Edit agent successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  return {
    listAgents: data?.agents,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    addAgentMutation,
    editAgentMutation,
  };
};

export default useListAgents;
