import { useCallback, useMemo, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../useQueryString';
import { fromNow } from '../../utils/helpers';

import { getKOCsBySKUCode } from '../../services/api';

export default function useKOCsBySKU(id) {
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
    const kocs = data?.users?.map((item) => {
      return {
        id: item?.id,
        email: item?.email,
        username: item?.username,
        phone: item?.phone,
        address: item?.address,
        bio: item?.bio,
        color: item?.color,
        avatarUrl: item?.avatar_url,
        lastSignIn: fromNow(item?.last_sign_in),
        roles: item?.roles?.map((role) => role?.name),
        tier: item?.settings?.find((setting) => setting?.type === 'user-tier'),
        category: item?.settings?.find(
          (setting) => setting?.type === 'user-category',
        ),
        platforms: item?.settings?.filter(
          (setting) => setting?.type === 'user-platform',
        ),
        productSold: item?.product_sold,
        permissionsCount: item?.permissions_count,
      };
    });
    const pagination = {
      total: data?.pagination?.total,
      currentPage: data?.pagination?.currentPage,
      totalPage: data?.pagination?.totalPage,
      limit: data?.pagination?.limit,
    };
    return {
      kocs,
      pagination,
    };
  }, []);

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ['kocs-sku', queryString],
    queryFn: () => getKOCsBySKUCode(id, queryString),
    staleTime: 60 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!id && !!page && !!limit,
    retry: 1,
  });

  const handlePageChange = useCallback(
    ({ selected }) => {
      setQueryString({ ...queryString, page: selected + 1 });
    },
    [queryString, setQueryString],
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
    listKOCs: data?.kocs,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    isError,
    error,
    page,
    limit,
    totalPage: totalPage,
    handlePageChange,
  };
}
