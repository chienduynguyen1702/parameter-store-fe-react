import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../useQueryString';
import { getListUser } from '../../../services/api';
import { USERS } from '../../mocks/users';
import moment from 'moment';

const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};

const useListUsers = (defaultParams) => {
  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  const parseData = useCallback((data) => {
    const users = USERS?.map((item) => {
      return {
        id: item.id,
        username: item.username,
        phone: item.phone,
        email: item.email,
        avatarUrl: item.avatar_url,
        projects: item.projects,
        permissionsCount: item.permissions_count,
        roles: item.roles,
        lastSignIn: moment(item.last_sign_in).fromNow(),
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
    if (!page || !limit) {
      setQueryString(DEFAULT_QUERY_STRING);
    }
  }, [limit, page, queryString, setQueryString]);

  return {
    listUsers: data?.users,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    page,
    limit,
    totalPage: data?.pagination?.totalPage,
  };
};

export default useListUsers;
