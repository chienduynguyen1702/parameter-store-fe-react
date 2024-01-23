import { useCallback, useMemo, useEffect, useContext } from 'react';
import useQueryString from '../../hooks/useQueryString';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  archiveLiquidation,
  duplicateLiquidation,
  getListLiquidation,
  getListSettings,
} from '../../services/api';
import { fromNow } from '../../utils/helpers';
import { AuthContext } from '../../context/AuthContext';

export default function useListLiquidation({ viewOption }) {
  const queryClient = useQueryClient();

  const defaultQueryString = useMemo(() => {
    return {
      page: 1,
      limit: 10,
    };
  }, []);

  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  const parseData = useCallback((data) => {
    const liquidation = data?.liquidations?.map((item) => {
      return {
        id: item?.id,
        name: item?.name,
        from: item?.from,
        to: item?.to,
        receiver: {
          name: item?.users[0]?.username,
          color: item?.users[0]?.is_agency ? '#659EEA' : '#FF6A55',
        },
        cost: item?.cost,
        lastUpdated: fromNow(item?.updated_at),
        category: item?.settings?.filter(
          (item) => item?.type === 'liquidation-category',
        )[0],
        pic: item.settings?.filter(
          (item) => item?.type === 'liquidation-pic',
        )[0],
        status: item.settings?.filter(
          (item) => item?.type === 'liquidation-status',
        )[0],
      };
    });

    const totalLiquidation = data?.pagination?.total;
    const totalPage = data?.pagination?.totalPage;

    return { liquidation, totalLiquidation, totalPage };
  }, []);

  const parseDataSettings = useCallback((data) => {
    return data?.map((item) => ({
      id: item?.id,
      name: item?.name,
    }));
  }, []);

  const { me } = useContext(AuthContext);
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['liquidations', queryString, viewOption],
    queryFn: () => {
      if (
        typeof viewOption === 'undefined' ||
        viewOption === 'View all liquidations'
      ) {
        return getListLiquidation(queryString);
      } else return getListLiquidation({ ...queryString, agency: me.username });
    },
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
  });

  const listCategory = useQuery({
    queryKey: ['liquidation-category'],
    queryFn: () => {
      return getListSettings({ type: 'liquidation-category' });
    },
    select: (data) => {
      return parseDataSettings(data.data.data);
    },
  });

  const listPIC = useQuery({
    queryKey: ['liquidation-pic'],
    queryFn: () => {
      return getListSettings({ type: 'liquidation-pic' });
    },
    select: (data) => {
      return parseDataSettings(data.data.data);
    },
  });

  const listStatus = useQuery({
    queryKey: ['liquidation-status'],
    queryFn: () => {
      return getListSettings({ type: 'liquidation-status' });
    },
    select: (data) => {
      return parseDataSettings(data.data.data);
    },
  });

  const archiveLiquidationMutation = useMutation(
    async (id) => {
      return archiveLiquidation(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['liquidations'],
        });
        queryClient.invalidateQueries({
          queryKey: ['liquidation-archivist-list'],
        });
      },
    },
  );

  const duplicateLiquidationMutation = useMutation(
    async (id) => {
      return duplicateLiquidation(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['liquidations'],
        });
      },
    },
  );

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, limit, page, queryString, setQueryString]);

  return {
    isSuccess,
    isLoading,
    isError,
    listLiquidation: data?.liquidation,
    totalLiquidation: data?.totalLiquidation,
    totalPage: data?.totalPage,
    limit,
    archiveLiquidationMutation,
    duplicateLiquidationMutation,
    listCategory: listCategory?.data,
    listPIC: listPIC?.data,
    listStatus: listStatus?.data,
  };
}
