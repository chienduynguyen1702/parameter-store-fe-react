import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { editUser } from '../../../services/api';

const useAddUser = ({ onClose }) => {
  const queryClient = useQueryClient();

  const editUserMutation = useMutation(
    (id, data) => {
      return editUser(id, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['users'],
        });
        queryClient.invalidateQueries({
          queryKey: ['user-archivist-list'],
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

  return {
    editUserMutation,
  };
};

export default useAddUser;
