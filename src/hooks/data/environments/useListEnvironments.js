import { useCallback, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import useQueryString from '../../useQueryString';
import {
  addEnvironment,
  editEnvironment,
  getProjectEnvironments,
} from '../../../services/api';
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
    const environments = data?.environments.map((item) => {
      return {
        name: item?.name,
        id: item?.ID,
        description: item?.description,
        // last_used: item.last_used,
      };
    });

    const pagination = {
      total: environments.length,
      currentPage: 1,
      totalPage: Math.ceil(environments.length / 10),
      limit: 10,
    };
    return { pagination, environments };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['environments', queryString],
    queryFn: () => getProjectEnvironments(project_id),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
  });

  const addEnvironmentMutation = useMutation(
    (data) => {
      return addEnvironment(data.project_id, data.data);
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

  const editEnvironmentMutation = useMutation(
    (body) => {
      return editEnvironment(body.project_id, body.environment_id, body.data);
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

  // const deleteEnvironmentMutation = useMutation(
  //   (id) => {
  //     return deleteEnvironment(id);
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({
  //         queryKey: ['environments'],
  //       });
  //       toast.success('Delete environment successfully');
  //     },
  //     onError: (error) => {
  //       toast.error(error.response.data.message, {
  //         autoClose: 5000,
  //       });
  //     },
  //   },
  // );

  return {
    listEnvironments: data?.environments,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    addEnvironmentMutation,
    editEnvironmentMutation,
  };
};

export default useListEnvironments;
