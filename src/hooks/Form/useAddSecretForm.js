import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useMatch, useOutletContext, useParams } from 'react-router';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';

import {
  addUser,
  editUser,
  getListRole,
  getListSettings,
  getUser,
  uploadImage,
} from '../../services/api';

import { AddUserSchema, EditUserSchema } from '../../utils/ValidateSchema';

export default function useAddSecretForm() {
  const { onClose } = useOutletContext();

  const queryClient = useQueryClient();

  // ------------------------------ Handle mode -----------------------------

  const addUserMatch = useMatch('/user-setting/users/add-user');
  const addKOCMatch = useMatch('/kocs/add-koc');

  const isAddMode = useMemo(
    () => Boolean(addUserMatch || addKOCMatch),
    [addUserMatch, addKOCMatch],
  );

  const schema = useMemo(() => {
    if (isAddMode) {
      return AddUserSchema;
    }
    return EditUserSchema;
  }, [isAddMode]);

  const { id } = useParams();

  const defaultForm = useMemo(
    () => ({
      id: '',
      avatar: '',
      username: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      userType: '',
      agency: '',
    }),
    [],
  );

  const parseData = useCallback(
    (data) => {
      return {
        ...defaultForm,

        id: data?.id || defaultForm.id,
        avatar: data?.avatar_url || defaultForm.avatar,
        username: data?.username || defaultForm.username,
        birthday: new Date(data?.date_of_birth) || defaultForm.birthday,
        email: data?.email || defaultForm.email,
      };
    },
    [defaultForm],
  );

  const addUsersMutation = useMutation(
    (data) => {
      return addUser(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['users'],
        });
        onClose();
        toast.success('Add user successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  // ------------------------------ Submit form ------------------------------
  const handleSubmit = useCallback(
    async (data) => {
      return addUsersMutation.mutate(data);
    },
    [addUsersMutation, id, isAddMode],
  );

  return {
    id,
    defaultForm,
    addUsersMutation,
    schema,
    isAddMode,
    handleSubmit,
  };
}
