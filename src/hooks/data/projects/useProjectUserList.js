import { useCallback, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import useQueryString from '../../useQueryString';
import { getProjectOverview } from '../../../services/api';
import { addUser, editUser, getListUser } from '../../../services/api';

const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};

const useProjectUserList = (id) => {
  const queryClient = useQueryClient();
  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(DEFAULT_QUERY_STRING);
    }
  }, [limit, page, queryString, setQueryString]);

  const parseData = useCallback((data) => {
    // console.log("parseData: ",data);
    const users = data?.users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user?.phone,
        // status: user.status,
        // last_login: user.last_login,
      };
    });
    
    // const pagination = {
      //   total: data.pagination.total,
    //   currentPage: data.pagination.currentPage,
    //   totalPage: data.pagination.totalPage,
    //   limit: data.pagination.limit,
    // };

    const pagination = {
      total: users.length,
      currentPage: 1,
      totalPage: 10,
      limit: 10,
    };
    // console.log ("pagination ",pagination);
    // console.log ("users ",users);
    return { pagination, users };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['projects', 'overview', id],
    queryFn: () => getProjectOverview(id),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data),
    enabled: !!page && !!limit,
  });
  // console.log("useProjectUserList: ",data);

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

export default useProjectUserList;