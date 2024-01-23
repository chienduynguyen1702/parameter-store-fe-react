import { useCallback, useMemo, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import useQueryString from '../useQueryString';
import { fromNow } from '../../utils/helpers';
import { archiveUser, editUser, getListUser } from '../../services/api';
import { toast } from 'react-toastify';

export default function useListUsers() {
  const queryClient = useQueryClient();
  const [totalPage, setTotalPage] = useState(1);

  const defaultQueryString = useMemo(() => {
    return {
      page: 1,
      limit: 10,
    };
  }, []);

  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  const parseData = useCallback((data) => {
    const users = data?.users?.map((item) => {
      return {
        id: item.id,
        email: item.email,
        username: item.username,
        phone: item.phone,
        address: item.address,
        bio: item.bio,
        color: item.color,
        avatarUrl: item.avatar_url,
        lastSignIn: fromNow(item.last_sign_in),
        roles: item.roles.map((role) => role.name),
        permissionsCount: item.permissions_count,
      };
    });
    const pagination = {
      total: data.pagination.total,
      currentPage: data.pagination.currentPage,
      totalPage: data.pagination.totalPage,
      limit: data.pagination.limit,
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

  useEffect(() => {
    if (data?.pagination?.totalPage) {
      setTotalPage(data.pagination.totalPage);
    }
  }, [data?.pagination?.totalPage]);

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, limit, page, queryString, setQueryString]);

  const editUsersMutation = useMutation(({ id, data }) => {
    return editUser(id, data);
  });

  const handleUpdateUserRole = ({ newSetting, itemId, itemRoles }) => {
    const body = {};
    const roles = itemRoles;
    const index = roles.indexOf(newSetting);

    if (index === -1) {
      body['roles'] = [...roles, newSetting];
    } else {
      body['roles'] = roles.filter((role) => role !== newSetting);
    }
    return editUsersMutation.mutate(
      { id: itemId, data: body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['users'],
          });
          toast.success('Edit User successfully');
        },
        onError: (error) => {
          toast.error(error.response.data.message, {
            autoClose: 5000,
          });
        },
      },
    );
  };

  const archiveUserMutation = useMutation(
    (id) => {
      return archiveUser(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['users'],
        });
        toast.success('User archived successfully');
      },
    },
  );

  return {
    listUsers: data?.users,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    page,
    limit,
    totalPage: totalPage,
    handleUpdateUserRole,
    archiveUserMutation,
  };
}
