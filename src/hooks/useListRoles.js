import { useCallback, useMemo, useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import useQueryString from './useQueryString';

import { getListRole, archiveRole } from '../services/api';

export default function useListRoles() {
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
    const roles = data.roles.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        createdAt: item.created_at,
        archiverId: item.archiver_id,
        archivedAt: item.archived_at,
        archived: item.archived,
        permissionsCount: item.permissions_count,
        countUser: item.user_count,
        permissions: item.permissions.map((permission) => {
          return {
            id: permission.id,
            name: permission.name,
            description: permission.description,
          };
        }),
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

  const archiveRoleMutation = useMutation(
    async (id) => {
      return archiveRole(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['roles'],
        });
        toast.success('Role archived successfully');
      },
    },
  );

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
    listRoles: data?.roles,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    limit,
    totalPage: totalPage,
    archiveRoleMutation,
  };
}
