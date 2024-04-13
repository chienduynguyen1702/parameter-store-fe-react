import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import useQueryString from '../../useQueryString';
import {
  addParameter,
  editParameter,
  getListParameter,
} from '../../../services/api';
import { PARAMETERS } from '../../mocks/parameters';
import moment from 'moment';
import { toast } from 'react-toastify';

const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};

const useListParameters = () => {
  const {id}  = useParams();
  const queryClient = useQueryClient();
  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(DEFAULT_QUERY_STRING);
    }
  }, [limit, page, queryString, setQueryString]);

  const parseData = useCallback((data) => {
    const parameters = data?.map((item) => {
      return {
        id: item.ID,
        name: item.name,
        value: item.value,
        stage: {
          name: item.stage.name,
          color: item.stage.color,
        },
        environment: {
          name: item.environment.name,
          color: item.environment.color,
        },
        createdAt: moment(item.CreatedAt).format('DD/MM/YYYY'),
        updatedAt: moment(item.UpdatedAt).format('DD/MM/YYYY'),
      };
    });
    const pagination = {
      total: parameters.length,
      currentPage: 1,
      totalPage: Math.ceil(parameters.length / 10),
      limit: 10,
    };
    return { pagination, parameters };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['projects', queryString],
    queryFn: () => getListParameter(id),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.parameters),
    enabled: !!page && !!limit,
  });

  const addParameterMutation = useMutation(
    (data) => {
      return addParameter(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['parameters'],
        });
        toast.success('Add parameter successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  const editParameterMutation = useMutation(
    (id, data) => {
      return editParameter(id, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['parameters'],
        });
        toast.success('Edit parameter successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  return {
    listParameters: data?.parameters,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    addParameterMutation,
    editParameterMutation,
  };
};

export default useListParameters;
