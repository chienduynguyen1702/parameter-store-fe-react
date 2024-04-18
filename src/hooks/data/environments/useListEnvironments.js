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

const useListEnvironments = (project_id) => {
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
    const environments = data?.map((item) => {
      return {
        name: item?.name,
        id: item?.id,
        description: item?.description,
        environment: {
          id: item.Environment.ID,
          name: item.Environment.name,
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
      total: environments.length,
      currentPage: 1,
      totalPage: Math.ceil(environments.length/10),
      limit: 10,
    };
    return { pagination, environments };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['environments', queryString],
    queryFn: () => getListAgent(project_id),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.environments),
    enabled: !!page && !!limit,
  });

  const addAgentMutation = useMutation(
    (data) => {
      return addAgent(data.project_id, data.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['environments'],
        });
        toast.success('Add environment successfully');
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
      return editAgent(body.project_id, body.environment_id, body.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['environments'],
        });
        toast.success('Edit environment successfully');
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
          queryKey: ['environments'],
        });
        toast.success('Delete environment successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  return {
    listEnvironments: data?.environments,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    addAgentMutation,
    editAgentMutation,
  };
};

export default useListEnvironments;
