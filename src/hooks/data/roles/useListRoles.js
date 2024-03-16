import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../useQueryString';
import { ROLES } from '../../mocks/roles';
import { getListRole } from '../../../services/api';

const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};

export default function useListRoles() {
  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  const parseData = useCallback((data) => {
    const roles = ROLES.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        usersCount: item.users_count,
        permissions: item.permissions,
      };
    });
    const pagination = {
      total: data.pagination.total,
      currentPage: data.pagination.currentPage,
      totalPage: data.pagination.totalPage,
      limit: data.pagination.limit,
    };
    return { pagination, roles };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['roles', queryString],
    queryFn: () => getListRole(queryString),
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
    listRoles: data?.roles,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    limit,
    totalPage: data?.pagination?.totalPage,
  };
}
