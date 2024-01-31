import { useCallback, useMemo, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from './useQueryString';
import { fromNow } from '../utils/helpers';
import { getListUser } from '../services/api';

export default function useListUsers() {
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

  return {
    listUsers: data?.users,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    page,
    limit,
    totalPage: totalPage,
  };
}
