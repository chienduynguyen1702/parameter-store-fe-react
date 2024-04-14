import { useCallback, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import useQueryString from '../../useQueryString';
import { getProjectOverview } from '../../../services/api';
import { addUserToProject, editUser, getListUser } from '../../../services/api';

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
    const users = data?.users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user?.phone,
        // status: user.status,
        // last_login: user.last_login,
      };
    });
    

    const pagination = {
      total: users.length,
      currentPage: 1,
      totalPage: Math.ceil(users.length/10),
      limit: 10,
    };
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
    (body) => {
      // console.log("addUserMutation data: ",body);
      return addUserToProject(body.project_id,body.data);
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
