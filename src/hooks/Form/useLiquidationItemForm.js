import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useMatch, useOutletContext, useParams } from 'react-router';
import { useCallback, useMemo, useState } from 'react';

import {
  getListSettings,
  getListKOC,
  getLiquidationItemById,
  getListAgency,
  updateLiquidationItem,
  addLiquidationItem,
} from '../../services/api';

import { scrollToTopModal } from '../../utils/helpers';
import useQueryString from '../../hooks/useQueryString';

export default function useLiquidationItemForm() {
  const { onClose } = useOutletContext();

  const queryClient = useQueryClient();

  const { queryString } = useQueryString();
  const { fileId } = queryString;

  // ------------------------------ Handle mode -----------------------------

  const addLiquidationMatch = useMatch(
    '/liquidation-file/add-liquidation-item',
  );

  const isAddMode = useMemo(
    () => Boolean(addLiquidationMatch),
    [addLiquidationMatch],
  );

  // ------------------------------ Handle Data Suggestions -----------------------------
  const categoriesQuery = useQuery({
    queryKey: ['liquidation-categories'],
    queryFn: () => {
      return getListSettings({
        type: 'liquidation-category',
      });
    },
    select: (data) =>
      data.data.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          color: item.color,
          type: item.type,
        };
      }),
  });

  const statusQuery = useQuery({
    queryKey: ['liquidation-status'],
    queryFn: () => {
      return getListSettings({
        type: 'liquidation-status',
      });
    },
    select: (data) =>
      data.data.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          color: item.color,
          type: item.type,
        };
      }),
  });

  const picsQuery = useQuery({
    queryKey: ['liquidation-pics'],
    queryFn: () => {
      return getListSettings({
        type: 'liquidation-pic',
      });
    },
    select: (data) =>
      data.data.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          color: item.color,
          type: item.type,
        };
      }),
  });

  const kocsQuery = useQuery({
    queryKey: ['kocs'],
    queryFn: () => getListKOC({ page: 1, limit: 1000 }),
    select: (data) =>
      data.data.data.users.map((item) => ({
        id: item.id,
        text: item.username,
      })),
  });

  const receiversQuery = useQuery({
    queryKey: ['receivers'],
    queryFn: () => getListAgency(),
    select: (data) =>
      data.data.data.map((item) => ({ id: item.id + '', text: item.username })),
  });

  // ------------------------------ Add Liquidation ------------------------------

  const { id } = useParams();

  const [defaultForm, setDefaultForm] = useState({
    liquidationName: '',
    description: '',
    fromDate: null,
    toDate: null,
    koc: '',
    receivers: '',
    video: [],
    category: '',
    status: '',
    cost: '',
    pic: '',
  });

  const parseData = useCallback(
    (data) => {
      return {
        ...defaultForm,
        id: data?.[0].id || defaultForm.id,
        liquidationName: data?.[0].name || defaultForm.liquidationName,
        description: data?.[0].description || defaultForm.description,
        fromDate: data?.[0].from || defaultForm.fromDate,
        toDate: data?.[0].to || defaultForm.toDate,
        koc:
          [
            {
              id: data?.[0].koc_id,
              text: data?.[0].koc_name,
            },
          ] || defaultForm.koc,
        receivers:
          [
            {
              id: data?.[0].receiver_id,
              text: data?.[0].receiver_name,
            },
          ] || defaultForm.receivers,
        videos:
          data?.[0]?.contents?.map((item) => item.id) || defaultForm.video,
        cost: Number(data?.[0].cost) || Number(defaultForm.cost),
        category:
          data?.[0].settings.find(
            (item) => item.type === 'liquidation-category',
          )?.name || defaultForm.category,
        status:
          data?.[0].settings.find((item) => item.type === 'liquidation-status')
            ?.name || defaultForm.category,
        pic:
          data?.[0].settings.find((item) => item.type === 'liquidation-pic')
            ?.name || defaultForm.category,
      };
    },
    [defaultForm],
  );

  // ------------------------------ Get Liquidation -----------------------------
  const liquidationQuery = useQuery({
    queryKey: ['liquidation-item', id],
    queryFn: () => {
      return getLiquidationItemById(id);
    },
    enabled: !isAddMode,
    select: (data) => parseData(data.data.data),
    onSuccess: (data) => {
      setDefaultForm(data);
    },
  });

  // ------------------------------ Add Liquidation ------------------------------

  const addLiquidationItemMutation = useMutation((data) => {
    return addLiquidationItem(data);
  });

  // ------------------------------ Edit Liquidation ------------------------------

  const editLiquidationItemMutation = useMutation(({ id, data }) => {
    return updateLiquidationItem(id, data);
  });

  // ------------------------------ Submit form ------------------------------

  const handleSubmit = useCallback(
    async (data) => {
      const body = {
        file_id: Number(fileId),
        name: data?.liquidationName,
        description: data?.description,
        from: new Date(data?.fromDate).toISOString().split('T')[0],
        to: new Date(data?.toDate).toISOString().split('T')[0],
        koc_id: Number(data?.koc?.[0]?.id),
        receiver_id: Number(data?.receivers?.[0]?.id),
        videos: data?.videos,
        category: data?.category,
        status: data?.status,
        cost: Number(data?.cost),
        pic: data?.pic,
      };

      if (isAddMode) {
        return addLiquidationItemMutation.mutate(body, {
          onSuccess: () => {
            toast.success('Add liquidation item successfully!');
            onClose();
            queryClient.invalidateQueries({
              queryKey: ['liquidations-items'],
            });
          },
          onError: (error) => {
            scrollToTopModal();
            toast.error(error.response.data.message);
          },
        });
      }

      return editLiquidationItemMutation.mutate(
        { id: id, data: body },
        {
          onSuccess: () => {
            toast.success('Edit liquidation item successfully!');
            onClose();
            queryClient.invalidateQueries({
              queryKey: ['liquidations-items'],
            });
          },
          onError: (error) => {
            scrollToTopModal();
            toast.error(error.response.data.message);
          },
        },
      );
    },

    [
      addLiquidationItemMutation,
      editLiquidationItemMutation,
      isAddMode,
      id,
      queryClient,
      onClose,
      fileId,
    ],
  );

  return {
    categoriesQuery,
    statusQuery,
    picsQuery,
    kocsQuery,
    receiversQuery,
    defaultForm,
    liquidationQuery,
    addLiquidationItemMutation,
    editLiquidationItemMutation,
    isAddMode,
    isLoading:
      editLiquidationItemMutation.isLoading ||
      addLiquidationItemMutation.isLoading,
    handleSubmit,
  };
}
