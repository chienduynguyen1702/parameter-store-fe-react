import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUser } from '../../../services/api';
import { toast } from 'react-toastify';

const useAddUser = ({ onClose }) => {
  const queryClient = useQueryClient();

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

  return {
    addUsersMutation,
  };
};

export default useAddUser;
