import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import useQueryString from '../../useQueryString';
import { addAgent, editAgent, getListAgent, deleteAgent } from '../../../services/api';
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
    const agents = data?.map((item) => {
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
        // last_used: item.last_used,
      };
    });

    const pagination = {
      total: agents.length,
      currentPage: 1,
      totalPage: Math.ceil(agents.length/10),
      limit: 10,
    };
    return { pagination, agents };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['agents', queryString],
    queryFn: () => getListAgent(project_id),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.agents),
    enabled: !!page && !!limit,
  });

  const addAgentMutation = useMutation(
    (data) => {
      return addAgent(data.project_id, data.data);
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
  };
};

export default useListAgents;
