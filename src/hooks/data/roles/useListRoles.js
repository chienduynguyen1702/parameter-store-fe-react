import { useCallback, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import useQueryString from '../../useQueryString';
import { ROLES } from '../../mocks/roles';
import { addRole, editRole, getListRoles } from '../../../services/api';
import { toast } from 'react-toastify';

const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};

export default function useListRoles() {
  const queryClient = useQueryClient();
  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(DEFAULT_QUERY_STRING);
    }
  }, [limit, page, queryString, setQueryString]);

  const parseData = useCallback((data) => {
    const roles = ROLES.map((item) => {
      return {
        id: item.ID,
        name: item.Name,
        description: item.Description,
        usersCount: item.users_count ?? 0,
        permissions: item.permissions ?? 0,
      };
    });
    // const pagination = {
    //   total: data.pagination.total,
    //   currentPage: data.pagination.currentPage,
    //   totalPage: data.pagination.totalPage,
    //   limit: data.pagination.limit,
    // };
    const pagination = {
      total: 3,
      currentPage: 1,
      totalPage: 1,
      limit: 10,
    };
    return { pagination, roles };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['roles', queryString],
    queryFn: () => getListRoles(queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
  });

  const addRoleMutation = useMutation(
    (data) => {
      return addRole(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['roles', queryString],
        });
        toast.success('Add role successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  const editRoleMutation = useMutation(
    (id, data) => {
      return editRole(id, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['roles', queryString],
        });
        toast.success('Edit role successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  return {
    listRoles: data?.roles,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    addRoleMutation,
    editRoleMutation,
  };
}
