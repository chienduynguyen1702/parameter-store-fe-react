import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMatch, useOutletContext, useParams } from 'react-router';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import {
  updateLiquidation,
  addLiquidation,
  getListSettings,
  getLiquidationById,
  getListAgency,
} from '../../services/api';

import { scrollToTopModal } from '../../utils/helpers';

export default function useLiquidationForm() {
  const { onClose } = useOutletContext();

  const queryClient = useQueryClient();

  // ------------------------------ Handle mode -----------------------------

  const addUserMatch = useMatch('/liquidation/add-liquidation');

  const isAddMode = useMemo(() => Boolean(addUserMatch), [addUserMatch]);

  // Data suggestions query
  const categoriesQuery = useQuery({
    queryKey: ['liquidation-categories'],
    queryFn: () => {
      return getListSettings({
        type: 'liquidation-category',
      });
    },
    select: (data) => data.data.data.map((item) => item.name),
  });

  const statusQuery = useQuery({
    queryKey: ['liquidation-status'],
    queryFn: () => {
      return getListSettings({
        type: 'liquidation-status',
      });
    },
    select: (data) => data.data.data.map((item) => item.name),
  });

  const picsQuery = useQuery({
    queryKey: ['liquidation-pics'],
    queryFn: () => {
      return getListSettings({
        type: 'liquidation-pic',
      });
    },
    select: (data) => data.data.data.map((item) => item.name),
  });

  const receiversQuery = useQuery({
    queryKey: ['agencies'],
    queryFn: () => getListAgency(),
    select: (data) =>
      data.data.data.map((item) => ({
        id: item.id,
        name: item.username,
      })),
  });

  // ------------------------------ Add Liquidation ------------------------------

  const { id } = useParams();

  const [defaultForm, setDefaultForm] = useState({
    liquidationName: '',
    fromDate: null,
    toDate: null,
    category: '',
    pic: '',
    status: '',
    cost: '',
    receivers: '',
  });

  const parseData = useCallback(
    (data) => {
      return {
        ...defaultForm,
        // if field is null, set default value
        id: data?.id || defaultForm.id,
        liquidationName: data?.name || defaultForm.liquidationName,
        fromDate: data?.from || defaultForm.fromDate,
        toDate: data?.to || defaultForm.toDate,
        cost: Number(data?.cost) || Number(defaultForm.cost),
        receivers: data?.users[0]?.username || defaultForm.receivers,
        category:
          data?.settings.find((item) => item.type === 'liquidation-category')
            ?.name || defaultForm.category,
        status:
          data?.settings.find((item) => item.type === 'liquidation-status')
            ?.name || defaultForm.category,
        pic:
          data?.settings.find((item) => item.type === 'liquidation-pic')
            ?.name || defaultForm.category,
      };
    },
    [defaultForm],
  );

  // ------------------------------ Get Liquidation -----------------------------
  const liquidationQuery = useQuery({
    queryKey: ['liquidation', id],
    queryFn: () => {
      return getLiquidationById(id);
    },
    enabled: !isAddMode,
    select: (data) => parseData(data.data.data),
    onSuccess: (data) => {
      setDefaultForm(data);
    },
  });

  // ------------------------------ Add Liquidation ------------------------------

  const addLiquidationMutation = useMutation((data) => {
    return addLiquidation(data);
  });

  // ------------------------------ Edit Liquidation ------------------------------

  const editLiquidationMutation = useMutation(({ id, data }) => {
    return updateLiquidation(id, data);
  });

  // ------------------------------ Submit form ------------------------------

  const handleSubmit = useCallback(
    async (data) => {
      const receiver = receiversQuery?.data?.find(
        (item) => item.name === data?.receivers,
      );
      const body = {
        name: data?.liquidationName,
        from: new Date(data?.fromDate).toISOString(),
        to: new Date(data?.toDate).toISOString(),
        cost: Number(data?.cost),
        platform: data?.platform,
        type: data?.type,
        status: data?.status,
        category: data?.category,
        pic: data?.pic,
        receivers: receiver
          ? [
              {
                id: receiver.id,
                name: receiver.name,
              },
            ]
          : null,
      };
      if (isAddMode) {
        return addLiquidationMutation.mutate(body, {
          onSuccess: () => {
            toast.success('Add liquidation successfully!');
            onClose();
            queryClient.invalidateQueries({
              queryKey: ['liquidations'],
            });
          },
          onError: (error) => {
            toast.error(error.response.data.message);
            scrollToTopModal();
          },
        });
      }

      return editLiquidationMutation.mutate(
        { id: id, data: body },
        {
          onSuccess: () => {
            toast.success('Edit liquidation successfully!');
            onClose();
            queryClient.invalidateQueries({
              queryKey: ['liquidations'],
            });
            queryClient.invalidateQueries({
              queryKey: ['liquidation-item'],
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
      addLiquidationMutation,
      editLiquidationMutation,
      isAddMode,
      id,
      queryClient,
      onClose,
      receiversQuery,
    ],
  );

  return {
    categoriesQuery,
    statusQuery,
    picsQuery,
    receiversQuery,
    defaultForm,
    liquidationQuery,
    addLiquidationMutation,
    editLiquidationMutation,
    isAddMode,
    isLoading:
      editLiquidationMutation.isLoading || addLiquidationMutation.isLoading,
    handleSubmit,
  };
}
