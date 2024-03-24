import { useCallback, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import useQueryString from '../../useQueryString';
import { addProject, editProject, getListUser } from '../../../services/api';
import { PROJECTS } from '../../mocks/projects';
import { toast } from 'react-toastify';

const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};

const useListProjects = () => {
  const queryClient = useQueryClient();
  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(DEFAULT_QUERY_STRING);
    }
  }, [limit, page, queryString, setQueryString]);

  const parseData = useCallback((data) => {
    const projects = PROJECTS?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        color: item.color,
        usersCount: item.users_count,
        description: item.description,
        address: item.address,
        currentSprint: item.currentSprint,
        startDate: item.startDate,
        status: item.status,
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

  const addProjectMutation = useMutation(
    (data) => {
      return addProject(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['projects'],
        });
        toast.success('Add project successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  const editProjectMutation = useMutation(
    (id, data) => {
      return editProject(id, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['projects'],
        });
        toast.success('Edit project successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  return {
    listProjects: data?.projects,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    addProjectMutation,
    editProjectMutation,
  };
};

export default useListProjects;
