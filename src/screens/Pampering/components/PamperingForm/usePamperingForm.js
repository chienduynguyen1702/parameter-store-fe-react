import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useMatch, useOutletContext, useParams } from 'react-router';
import { toast } from 'react-toastify';

import {
  addPampering,
  editPampering,
  getPampering,
  getPamperingSettings,
  uploadImage,
} from '../../../../services/api';

import { scrollToTopModal } from '../../../../utils/helpers';

export default function usePamperingForm() {
  const { onClose } = useOutletContext();

  const queryClient = useQueryClient();

  // Switch between Add and Edit mode
  let addPamperingMatch;
  if (Boolean(useMatch('pamperings/calendar-view/add-pampering')))
    addPamperingMatch = true;
  if (Boolean(useMatch('pamperings/table-view/add-pampering')))
    addPamperingMatch = true;

  const isAddMode = useMemo(
    () => Boolean(addPamperingMatch),
    [addPamperingMatch],
  );

  const { id } = useParams();

  // Data suggestions query
  const usersQuery = useQuery({
    queryKey: ['pampering-pic'],
    queryFn: () => getPamperingSettings({ type: 'pampering-pic' }),
    staleTime: 10 * 1000,
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

  const categoriesQuery = useQuery({
    queryKey: ['pampering-category'],
    queryFn: () => getPamperingSettings({ type: 'pampering-category' }),
    staleTime: 10 * 1000,
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
    queryKey: ['pampering-status'],
    queryFn: () => getPamperingSettings({ type: 'pampering-status' }),
    staleTime: 10 * 1000,
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

  // Pampering mutation query
  const addPamperingsMutation = useMutation((data) => {
    return addPampering(data);
  });

  const editPamperingMutation = useMutation(({ id, data }) => {
    return editPampering(id, data);
  });

  const uploadImageMutation = useMutation((data) => {
    return uploadImage(data);
  });

  // Default form value
  const [defaultForm, setDefaultForm] = useState({
    name: '',
    date: '',
    category: '',
    pic: '',
    status: '',
    cost: '',
    evidence: '',
  });
  // Parse data to default form value
  const parseData = useCallback(
    (data) => {
      return {
        ...defaultForm,
        // if field is null, set default value
        name: data?.name || defaultForm.name,
        date: new Date(data?.date || defaultForm.date),
        pic:
          {
            color: data?.pic?.color,
            id: data?.pic?.id,
            name: data?.pic?.name,
            type: data?.pic?.type,
          } || defaultForm.pic,
        category:
          {
            color: data?.category?.color,
            id: data?.category?.id,
            name: data?.category?.name,
            type: data?.category?.type,
          } || defaultForm.category,
        status:
          {
            color: data?.status?.color,
            id: data?.status?.id,
            name: data?.status?.name,
            type: data?.status?.type,
          } || defaultForm.status,
        cost: data?.cost || defaultForm.cost,
        evidence: data?.evidence_url || defaultForm.evidence,
      };
    },
    [defaultForm],
  );

  // ------------------------------ Get Pampering -----------------------------
  const pamperingQuery = useQuery({
    queryKey: ['pampering', id],
    queryFn: () => {
      return getPampering(id);
    },
    enabled: !isAddMode,
    select: (data) => parseData(data.data.data),
    onSuccess: (data) => {
      setDefaultForm({
        ...data,
        pic: data?.pic?.name,
        category: data?.category?.name,
        status: data?.status?.name,
      });
    },
  });

  const handleSubmit = useCallback(
    async (data) => {
      let evidenceUrl = null;
      if (
        data.evidence instanceof File &&
        data.evidence !== pamperingQuery.data?.evidence_url
      ) {
        const uploadImageResponse = await uploadImageMutation.mutateAsync({
          file: data.evidence,
        });
        evidenceUrl = uploadImageResponse.data.data || null;
      }

      const body = {
        name: data?.name,
        date: new Date(
          data?.date.getTime() - data?.date.getTimezoneOffset() * 60000,
        ).toISOString(),
        pic: data?.pic,
        category: data?.category,
        status: data?.status,
        cost: data?.cost,
        evidence_url: evidenceUrl ? evidenceUrl : data.evidence,
      };

      if (isAddMode) {
        return addPamperingsMutation.mutate(body, {
          onSuccess: () => {
            toast.success('Add pampering successfully!');
            onClose();
            queryClient.invalidateQueries('pamperings', { limit: 5, page: 1 });
          },
          onError: (error) => {
            toast.error(error.response.data.message);
            scrollToTopModal();
          },
        });
      }

      return editPamperingMutation.mutate(
        { id: id, data: body },
        {
          onSuccess: () => {
            toast.success('Edit pampering successfully!');
            onClose();
            queryClient.invalidateQueries({
              queryKey: ['pamperings'],
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
      pamperingQuery.data?.evidence_url,
      isAddMode,
      editPamperingMutation,
      id,
      uploadImageMutation,
      addPamperingsMutation,
      onClose,
      queryClient,
    ],
  );

  //-------------------------------- Edit Pampering---------------------------------------

  return {
    categoriesQuery,
    statusQuery,
    usersQuery,
    pamperingQuery,
    handleSubmit,
    isLoading:
      editPamperingMutation.isLoading ||
      addPamperingsMutation.isLoading ||
      uploadImageMutation.isLoading,
    defaultForm,
  };
}
