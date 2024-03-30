import { useCallback, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import useQueryString from '../../useQueryString';
import { addUser, editUser, getListUser } from '../../../services/api';

const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};

const useListUsers = () => {
  const queryClient = useQueryClient();
  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(DEFAULT_QUERY_STRING);
    }
  }, [limit, page, queryString, setQueryString]);

  const parseData = useCallback((data) => {
    const users = data?.users?.map((item) => {
      return {
        id: item.ID,
        username: item.Username,
        phone: item.Phone,
        email: item.Email,
        // avatarUrl: item.avatar_url,
        // projects: item.projects,
        // permissionsCount: item.permissions_count,
        // roles: item.roles,
        // lastSignIn: moment(item.last_sign_in).fromNow(),
      };
    });

    // const pagination = {
    //   total: data.pagination.total,
    //   currentPage: data.pagination.currentPage,
    //   totalPage: data.pagination.totalPage,
    //   limit: data.pagination.limit,
    // };

    const pagination = {
      total: 100,
      currentPage: 1,
      totalPage: 10,
      limit: 10,
    };
    return { pagination, users };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['users', queryString],
    queryFn: () => getListUser(queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
  });

  const addUserMutation = useMutation(
    (data) => {
      return addUser(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['users', queryString],
        });
        toast.success('Add user successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  const editUserMutation = useMutation(
    (id, data) => {
      return editUser(id, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['users', queryString],
        });
        toast.success('Edit user successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  return {
    listUsers: data?.users,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    addUserMutation,
    editUserMutation,
  };
};

export default useListUsers;
