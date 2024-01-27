import { useCallback, useMemo, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../useQueryString';
import { fromNow } from '../../utils/helpers';
import { getListSecrets } from '../../services/api';
import moment from 'moment';

export default function useListSecrets() {
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
    const secrets = data?.result?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        value: item.value,
        projectId: item.project_id,
        projectName: item.project_name,
        createdBy: item.created_by,
        createdAt: moment(item.created_at).format('DD/MM/YYYY'),
        updatedAt: fromNow(item.updated_at),
        deletedAt: item.deleted_at,
      };
    });
    const pagination = {
      total: data.pagination.total,
      currentPage: data.pagination.currentPage,
      totalPage: data.pagination.totalPage,
      limit: data.pagination.limit,
    };
    return { pagination, secrets };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['secrets', queryString],
    queryFn: () => getListSecrets(queryString),
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
    listSecrets: data?.secrets,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    page,
    limit,
    totalPage: totalPage,
  };
}
