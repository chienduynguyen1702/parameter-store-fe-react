import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import moment from 'moment';

import {
  addListSettings,
  addSetting,
  getListSettings,
  importLiquidation,
} from '../../services/api';

import useListAgencies from '../../hooks/Suggestion/useListAgencies';

export default function useImportLiquidations() {
  const queryClient = useQueryClient();

  const { listAgencies } = useListAgencies();

  const parseDataSettings = useCallback((data) => {
    return data?.map((item) => ({
      id: item.id,
      name: item.name,
      color: item.color,
      type: item.type,
    }));
  }, []);

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

  const addSettingMutation = useMutation(
    (data) => {
      return addSetting(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('liquidation-category');
        queryClient.invalidateQueries('liquidation-status');
        queryClient.invalidateQueries('liquidation-pic');
      },
    },
  );

  const addListSettingsMutation = useMutation(
    (data) => {
      return addListSettings(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('liquidation-category');
        queryClient.invalidateQueries('liquidation-status');
        queryClient.invalidateQueries('liquidation-pic');
      },
    },
  );

  const importLiquidationsMutation = useMutation(
    (items) => {
      const result = items.map((item) => {
        return {
          name: item.name,
          from: moment(item.from, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          to: moment(item.to, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          category: item.category?.name,
          pic: item.pic?.name,
          status: item.status?.name,
          cost: Number(item.cost),
          receivers: listAgencies?.data?.find(
            (agency) => agency.name === item.receiver,
          ),
        };
      });
      return importLiquidation(result);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['liquidations'],
        });
        toast.success('Import Liquidations successfully');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message ?? error.message);
      },
    },
  );

  return {
    listCategory,
    listPIC,
    listStatus,
    addSettingMutation,
    addListSettingsMutation,
    importLiquidationsMutation,
  };
}
