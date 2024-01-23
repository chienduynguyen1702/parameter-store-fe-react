import { useCallback, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  archiveLiquidationItem,
  duplicateLiquidationItem,
  getListLiquidationsItems,
  getListSettings,
} from '../../services/api';

import useQueryString from '../../hooks/useQueryString';
import { fromNow } from '../../utils/helpers';

export default function useListLiquidationItem() {
  const queryClient = useQueryClient();

  const { queryString, setQueryString } = useQueryString();

  const { page, limit, fileId } = queryString;

  useEffect(() => {
    if (fileId && (!page || !limit)) {
      setQueryString({
        fileId: fileId,
        page: 1,
        limit: 10,
      });
      return;
    }

    if (!page || !limit || !fileId) {
      setQueryString({
        page: 1,
        limit: 10,
        fileId: 1,
      });
    }
  }, [limit, page, fileId, queryString, setQueryString]);

  const parseData = useCallback((data) => {
    const liquidationsItems = data?.liquidationsItems?.map((item) => {
      return {
        id: item?.id,
        name: item?.name,
        description: item?.description,
        from: new Date(item?.from).toLocaleDateString('en-GB'),
        to: new Date(item?.to).toLocaleDateString('en-GB'),
        receiver: {
          name: item?.receiver_name,
          color: item?.receiver_is_agency ? '#659EEA' : '#FF6A55',
        },
        videos: item?.contents,
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

    const totalLiquidationsItems = data?.total?.liquidations_items;
    const totalPage = data?.total?.page;

    return { liquidationsItems, totalLiquidationsItems, totalPage };
  }, []);

  const parseDataSettings = useCallback((data) => {
    return data?.map((item) => ({
      id: item?.id,
      name: item?.name,
    }));
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['liquidations-items', queryString],
    queryFn: () => {
      return getListLiquidationsItems(queryString);
    },
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit && !!fileId,
  });

  const listCategory = useQuery({
    queryKey: ['liquidations-category'],
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

  const archiveLiquidationItemMutation = useMutation(
    async (id) => {
      return archiveLiquidationItem(id);
    },
    {
      onSuccess: () => {
        toast.success('Liquidation archived successfully');
        queryClient.invalidateQueries({
          queryKey: ['liquidations-items'],
        });
        queryClient.invalidateQueries({
          queryKey: ['liquidation-item-archivist-list'],
        });
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    },
  );

  const duplicateLiquidationItemMutation = useMutation(
    (id) => {
      return duplicateLiquidationItem(id);
    },
    {
      onSuccess: () => {
        toast.success('Liquidation duplicated successfully');
        queryClient.invalidateQueries({
          queryKey: ['liquidations-items'],
        });
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
        toast.error(error?.message);
      },
    },
  );
  return {
    isSuccess,
    isLoading,
    listLiquidationsItems: data?.liquidationsItems,
    totalLiquidationsItems: data?.totalLiquidationsItems,
    totalPage: data?.totalPage,
    limit,
    archiveLiquidationItemMutation,
    duplicateLiquidationItemMutation,
    listCategory: listCategory?.data,
    listPIC: listPIC?.data,
    listStatus: listStatus?.data,
  };
}
