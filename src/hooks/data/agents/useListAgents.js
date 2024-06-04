import { useCallback, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import useQueryString from '../../useQueryString';
import {
  addAgent,
  editAgent,
  getListAgent,
  deleteAgent,
  downloadAgentScript,
} from '../../../services/api';
import { toast } from 'react-toastify';

const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};

const useListAgents = (project_id) => {
  // const {id}  = useParams();
  const queryClient = useQueryClient();
  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(DEFAULT_QUERY_STRING);
    }
  }, [limit, page, queryString, setQueryString]);

  const parseData = useCallback((data) => {
    const agents = data?.agents?.map((item) => {
      return {
        name: item?.name,
        id: item?.id,
        description: item?.description,
        stage: {
          id: item.Stage.ID,
          name: item.Stage.name,
        },
        environment: {
          id: item.Environment.ID,
          name: item.Environment.name,
        },
        workflow_name: item.workflow_name,
        last_used_at: item.last_used_at,
      };
    });

    const pagination = {
      total: data?.total,
      currentPage: 1,
      totalPage: Math.ceil((data?.total || 0) / 10),
      limit: 10,
    };
    return { pagination, agents };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['agents', queryString],
    queryFn: () => getListAgent(project_id, queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data),
    enabled: !!page && !!limit,
  });

  const addAgentMutation = useMutation(
    (data) => {
      // console.log('addAgentMutation data', data);
      return addAgent(data.project_id, data.data);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ['agents'],
        });
        toast.success('Add agent successfully');
        return data;
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  const editAgentMutation = useMutation(
    (body) => {
      return editAgent(body.project_id, body.agent_id, body.data);
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

  const deleteAgentMutation = useMutation(
    (id) => {
      return deleteAgent(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['agents'],
        });
        toast.success('Delete agent successfully');
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
    deleteAgentMutation,
  };
};

export default useListAgents;
