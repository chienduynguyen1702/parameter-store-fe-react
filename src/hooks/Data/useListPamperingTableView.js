import { useCallback, useMemo, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import useQueryString from '../useQueryString';

import { getListPamperings, archivePampering } from '../../services/api';

import { dateToUrl, fromNow } from '../../utils/helpers';

export default function useListPamperingTableView() {
  const queryClient = useQueryClient();

  const defaultQueryString = useMemo(() => {
    return {
      page: 1,
      limit: 10,
    };
  }, []);
  const { queryString, setQueryString } = useQueryString();

  const { page, limit, from, to } = queryString;

  const handlePageChange = useCallback(
    ({ selected }) => {
      setQueryString({ ...queryString, page: selected + 1 });
    },
    [queryString, setQueryString],
  );

  const parseData = useCallback((data) => {
    const listPamperings = data.pamperings.map((item) => ({
      title: item.name,
      start: dateToUrl(new Date(item.date)),
      className: '',
      id: item.id,
      pamperingTitle: item.name,
      name: item.name,
      category: item.category,
      cost: item.cost,
      pic: item.pic,
      evidence: item.evidence_url,
      status: item.status,
      lastUpdate: fromNow(item?.updated_at),
    }));
    const totalPage = data?.pagination?.totalPage;
    const total = data?.pagination?.total;
    return { listPamperings, totalPage, total };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['pamperings', queryString],
    queryFn: () => getListPamperings(queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });

  const archivePamperingMutation = useMutation(
    async (id) => {
      return archivePampering(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['pamperings'],
        });
      },
    },
  );

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, limit, page, from, to, queryString, setQueryString]);

  return {
    listPamperings: data?.listPamperings,
    isSuccess,
    isLoading,
    page,
    limit,
    totalPage: data?.totalPage,
    total: data?.total,
    handlePageChange,
    archivePamperingMutation,
  };
}
